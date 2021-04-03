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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: 400,
    },
    title: {
      display: "flex",
      justifyContent: "center",
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
                <Tooltip disableHoverListener>
                  <Button>
                    {" "}
                    <Typography variant="h4" component="h2">
                      Balance:
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener title="Add">
                  <Button>
                    <h3>Ingresos: ${props.propIngreso}</h3>
                    <h3>Egresos: ${props.propEgreso}</h3>
                    <h3>Total: ${props.propMontoTotal}</h3>
                  </Button>
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
