import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import ClearIcon from "@material-ui/icons/Clear";

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
        <Paper component='form' className='search-title-wrapper'></Paper>
        <Paper component='form' className='searchbar-wrapper'>
          <IconButton>
            <LanguageOutlinedIcon />
          </IconButton>
          <TextField
            variant='outlined'
            className='input-searchfield'
            label='Link do anotacji'
            onChange={this.props.handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => this.props.clearResults()}>
                  <ClearIcon color='disabled' fontSize='small' />
                </IconButton>
              ),
            }}
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
