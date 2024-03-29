import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  InputAdornment,
  Typography,
  makeStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const RecordList = (props) => {
  const useStyles = makeStyles({
    fatherRoot: {
      width: "100%",
      display: "flex",
      overflowX: "inherit",
      flexDirection: "row",
      justifyContent: "center",
    },
    root: {
      width: props.width,
      boxShadow: "-3px -1px 12px 0px",
      marginTop: "50px",
      display: "table",
    },
    editTable: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    styleContentText: {
      display: "flex",
    },
    styleDialogTitle: {
      display: "flex",
      justifyContent: "center",
    },
    buttonActionsStyle: {
      color: "#ad8282",
    },
    titleCell: {
      color: "#ad8282",
      fontFamily: "system-ui",
      fontSize: "20px",
    },
    buttonActionesSecondTable: {
      fontFamily: "system-ui",
      fontSize: "20px",
      color: "#ad8282",
    },
    
  });
  const [open, setOpen] = React.useState(false);

  const [itemConcept, setItemConcept] = useState();
  const [itemAmount, setItemAmount] = useState();
  const [itemDate, setItemDate] = useState();
  const [elementId, setElementId] = useState();
  const [type, setType] = useState();

  const handleClickOpen = (item) => {
    setOpen(true);
    setItemConcept(item.concepto);
    setItemAmount(item.monto);
    setItemDate(item.fecha);
    setElementId(item.id);
    setType(item.tipo);
  };
  const onChangeHandler = (event) => {
    setItemConcept(event.target.value);
  };
  const onChangeHandlerAmount = (event) => {
    setItemAmount(event.target.value);
  };
  const onChangeHandlerDate = (event) => {
    setItemDate(event.target.value);
  };

  const handleClickSave = () => {
    const index = props.list.findIndex((element) => element.id === elementId);
    let newArr = [...props.list];
    newArr[index] = {
      concepto: itemConcept,
      monto: parseInt(itemAmount),
      fecha: itemDate,
      tipo: type,
      id: elementId,
    };

    acceptConsult(newArr[index]);

    props.setList(newArr);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const acceptConsult = async (object) => {
    const response = await fetch(
      "http://localhost:3004/" + object.tipo + "/" + object.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );
  };

  const deleteConsult = async (object) => {
    console.log(object);
    const response = await fetch(
      "http://localhost:3004/" + object.tipo + "/" + object.id,
      {
        method: "DELETE",
      }
    );
  };
  const classes = useStyles();
  return (
    <>
      <TableContainer className={classes.fatherRoot}>
        <Table className={classes.root}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.titleCell}>Concepto</TableCell>
              <TableCell className={classes.titleCell}>Monto</TableCell>
              <TableCell className={classes.titleCell}>Fecha</TableCell>
              <TableCell className={classes.titleCell}>Tipo</TableCell>

              {props.propsBooleano ? (
                <>
                  <TableCell className={classes.buttonActionesSecondTable}>Eliminar </TableCell>
                  <TableCell className={classes.buttonActionesSecondTable}> Editar </TableCell>
                </>
              ) : undefined}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.list.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.concepto}
                </TableCell>
                <TableCell>{item.monto}</TableCell>
                <TableCell>{item.fecha}</TableCell>
                <TableCell>{item.tipo}</TableCell>

                {props.propsBooleano ? (
                  <>
                    <TableCell>
                      <Button className={classes.buttonActionsStyle}
                        onClick={() => {
                          props.deleteOperation(item);
                          deleteConsult(item);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className={classes.buttonActionsStyle}
                        onClick={() => {
                          handleClickOpen(item);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </>
                ) : undefined}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.styleDialogTitle}>
            <Typography>Edita tus operaciones aqui </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText className={classes.styleContentText}>
              <Input
                defaultValue={itemConcept}
                onChange={onChangeHandler}
                value={itemConcept}
              />

              <Input
                onChange={onChangeHandlerAmount}
                defaultValue={itemAmount}
                value={itemAmount}
                type={"number"}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                id="standard-basic"
              />
              <Input
                id="standard-basic"
                defaultValue={itemDate}
                value={itemDate}
                onChange={onChangeHandlerDate}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button className={classes.buttonActionsStyle}
              onClick={() => {
                handleClose();
              }}
              color="primary"
            >
              Cancelar
            </Button>
            <Button className={classes.buttonActionsStyle}
              onClick={() => {
                handleClose();
                handleClickSave();
              }}
              color="primary"
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default RecordList;
