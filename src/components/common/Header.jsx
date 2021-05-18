import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Container, Grid } from "@material-ui/core";

export class Header extends Component {
  render() {
    return (
      <AppBar className='app-bar'>
        <Container maxWidth='xl'>
          <Grid
            container
            spacing={4}
            justify='center'
            className='grid-container-header'>
            <div className='App-title'>
              <Link to='/' className='search-app-logo'>
                <h2>
                  {" "}
                  wizualizator <br></br>
                  NER
                </h2>
              </Link>
              <p>Narzędzie umożliwia wizualizację anotacji tekstu</p>
            </div>
          </Grid>
        </Container>
      </AppBar>
    );
  }
}
