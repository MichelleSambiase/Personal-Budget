import React, { useState, useEffect } from "react";

import Home from "./components/Home";
import RecordList from "./components/RecordList";

import {
  makeStyles,
  Input,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
} from "@material-ui/core";

function App() {
  const useStyles = makeStyles({
    rootFather: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    rootForm: {
      justifyContent: "center",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2%",
    },
    select: {
      display: "flex",
    },
    buttonForm: {
      width: "100%",
    },
    buttonActionsStyle: {
      color: "#ad8282",
      border: "1px solid rgb(235 235 235)",
    },
  });
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([]);

  const [ingreso, setIngreso] = useState(0);
  const [egreso, setEgreso] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);

  const [input, setInput] = useState({
    concepto: "",
    monto: 0,
    fecha: "",
    tipo: "ingresos",
  });

  const addConsult = async () => {
    const data = {
      ...input,
      monto: parseInt(input.monto),
    };
    console.log(input);
    const response = await fetch("http://localhost:3004/" + input.tipo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  function handleChange(e, prop) {
    setInput({ ...input, [prop]: e.target.value });
  }
  const handleClick = (item) => {
    const filterOperation = list.filter((element) => item.id !== element.id);
    setList(filterOperation);
  };

  const getBalance = async () => {
    let montoIngresos = 0;
    let montoEgresos = 0;

    const res = await fetch("http://localhost:3004/ingresos");

    const egresos = await fetch("http://localhost:3004/egresos");

    const resIngresos = await res.json();
    const resEgresos = await egresos.json();

    resIngresos.forEach((element) => {
      montoIngresos = montoIngresos + element.monto;
    });
    resEgresos.forEach((element) => {
      montoEgresos = montoEgresos + element.monto;
    });

    setIngreso(montoIngresos);
    setEgreso(montoEgresos);
    setMontoTotal(montoIngresos - montoEgresos);

    setList([...resIngresos, ...resEgresos]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getBalance();
  }, []);
  const classes = useStyles();
  return (
    <div className="App">
      <Home
        propIngreso={ingreso}
        propEgreso={egreso}
        propMontoTotal={montoTotal}
        propList={list}
      />
      <Container className={classes.button}>
        <Button  className={classes.buttonActionsStyle} variant="outlined" color="primary" onClick={handleClickOpen}>
          Agregar
        </Button>
      </Container>
      <RecordList
        list={list}
        propsBooleano={true}
        deleteOperation={handleClick}
        setList={setList}
        width={"80%"}
      />
      <Container className={classes.rootFather}>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form className={classes.rootForm}>
              <Grid item>
                <Input
                  type="text"
                  placeholder="concepto"
                  onChange={(e) => handleChange(e, "concepto")}
                ></Input>
              </Grid>

              <Grid item>
                <Input
                  label="Standard"
                  placeholder="monto"
                  onChange={(e) => handleChange(e, "monto")}
                ></Input>
              </Grid>
              <Grid item>
                <Input
                  label="Standard"
                  placeholder="fecha"
                  onChange={(e) => handleChange(e, "fecha")}
                ></Input>
              </Grid>

              <Select
                onChange={(e) => handleChange(e, "tipo")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.select}
              >
                <MenuItem value="ingresos">Ingresos</MenuItem>
                <MenuItem value="egresos">Egresos</MenuItem>
              </Select>
              <Button
                className={classes.buttonForm}
                type="submit"
                onClick={() => addConsult()}
              >
                Confirmar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
