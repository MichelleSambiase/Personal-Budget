import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
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
              <TableCell>Concepto</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo</TableCell>

              {props.propsBooleano ? (
                <>
                  <TableCell>Eliminar </TableCell>
                  <TableCell> Editar </TableCell>
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
                      <Button
                        onClick={() => {
                          props.deleteOperation(item);
                          deleteConsult(item);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
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
          <DialogTitle>
            <Typography>Edit yours operations here </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
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
            <Button
              onClick={() => {
                handleClose();
              }}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleClose();
                handleClickSave();
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default RecordList;
