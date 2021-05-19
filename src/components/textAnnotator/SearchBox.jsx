import React, { Component } from "react";
import {
  Typography,
  Button,
  Grid,
  Grow
  } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";


export class SearchBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Grid
        container
        spacing={4}
        justify='center'
        className='search-grid-container'>
        <Paper component='form' className='search-title-wrapper'>
          {/* <Typography className='search-title'>
            Tu wklej link
          </Typography> */}
        </Paper>
        <Paper component='form' className='searchbar-wrapper'>
          {/* <IconButton aria-label='menu'>
            <MenuIcon />
          </IconButton> */}
          <InputBase
            className='input-searchfield'
            placeholder='Link do anotacji'
            inputProps={{ "aria-label": "search" }}
            onChange={this.props.handleChange}
            type="search"
          />
          <IconButton
            type='submit'
            onClick={this.props.handleSearch}
            aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}
