import React from "react";
import RecordList from "./RecordList";

import {
  Card,
  CardContent,
  Typography,
  Container,
  makeStyles,
  Button,
  Grid,
  Tooltip,
} from "@material-ui/core";

const Home = (props) => {
  const useStyles = makeStyles({
    rootFather: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
    },
    root: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: 400,
    },
    title: {
      display: "flex",
      justifyContent: "center",
    },
    gridItemStyleBalance: {
      display: "flex",
      fontSize: "15px",
      justifyContent: "space-between",
      color: "#848484",
    },
    titleStyle: {
      fontFamily: "system-ui",
      color: "#ad8282",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Container>
        <div className={classes.rootFather}>
          <Card className={classes.root}>
            <CardContent>
              <Grid className={classes.title} item>
                <Tooltip disableHoverListener title="balance">
                  <Button>
                    {" "}
                    <Typography variant="h4" component="h2">
                      Balance:
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item className={classes.gridItemStyleBalance}>
                <Tooltip disableHoverListener title="Add">
                  <span>
                <p className={classes.colorNumer}>
                  Ingresos: ${props.propIngreso}
                </p>{" "}
                <p className={classes.colorNumer}>
                  Egresos: ${props.propEgreso}
                </p>
                <p className={classes.colorNumer}>
                  Total: ${props.propMontoTotal}
                </p>   
                </span>     
                </Tooltip>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Container>
      <RecordList list={props.propList} propsBooleano={false} width={"30%"} />
    </div>
  );
};

export default Home;
