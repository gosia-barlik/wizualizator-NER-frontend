import React, { Component } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { EndText } from "./EndText.jsx";
import { SearchBox } from "./SearchBox.jsx";
import config from "../../config";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

export class TextAnnotator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      annotatedText: "",
      response: [],
      Benefit: true, //TODO: zagnieżdzonme propertisy, zamienić na zwracane z backendu code-namy
      Company: true,
      Education: true,
      Experience: true,
      "Language skill": true,
      "Occupation name": true,
      "Professional skill": true,
      "Soft skill": true,
      link: "",
    };
  }

  // ADD SPLICE TO STRING PROTOTYPE
  componentDidMount() {
    String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
  }

  // HANDLE CHANGE ON TEXTAREA
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
  };

  // HANDLE CHANGE ON SEARCHFIELD
  handleChangeLink = (e) => {
    e.preventDefault();
    this.setState({
      link: e.target.value,
    });
  };

  // HANDLE CHANGE THE REQUEST
  handleSend = (e) => {
    e.preventDefault();
    const url = `${config.BASE_URL}/ner_text/`;
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        text: this.state.text,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.entities;
      })
      .then((data) => {
        this.sortLabels(data);
        this.setState({
          response: data,
        });
      })
      .then(() => {
        this.addHighlightedLabels();
      });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const url = `${config.BASE_URL}/ner_link/`;
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        text: this.state.link,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          text: data.text,
        });
        return data.entities;
      })
      .then((data) => {
        this.sortLabels(data);
        this.setState({
          response: data,
        });
      })
      .then(() => {
        this.addHighlightedLabels();
      });
  };

  sortLabels = (data) => {
    data.sort((a, b) =>
      a.start_char > b.start_char ? 1 : b.start_char > a.start_char ? -1 : 0
    );
  };

  getClass = (annotation) => {
    switch (annotation.label) {
      case "Benefit":
        return "benefit";

      case "Company":
        return "company";

      case "Soft skill":
        return "softskl";

      case "Professional skill":
        return "profskl";

      case "Language skill":
        return "langskl";

      case "Experience":
        return "experce";

      case "Education":
        return "educatn";

      case "Occupation name":
        return "ocupnam";
    }
  };

  highlightLabels = (annotation, i, baseText) => {
    const startSpan = `<span class="${this.getClass(annotation)}">`;
    const endSpan = `<span class="annotation-name"> ${this.getClass(
      annotation
    )} </span></span>`;
    const spansLength = (startSpan.length + endSpan.length) * i;
    const startPosition = annotation.start_char + spansLength;
    const endPosition =
      startPosition + (annotation.end_char - annotation.start_char);
    const newStr = baseText.splice(endPosition, 0, endSpan);
    let endStr = newStr.splice(startPosition, 0, startSpan);
    return endStr;
  };

  addHighlightedLabels = () => {
    let i = 0;
    let baseText = this.state.text;
    this.state.response.map((annotation) => {
      if (this.state[annotation.label]) {
        baseText = this.highlightLabels(annotation, i, baseText);
        i++;
      }
    });

    this.setState({ annotatedText: baseText });
  };

  //HANDLE CHECKBOX
  handleCheckbox = (event) => {
    this.setState(
      { [event.target.name]: event.target.checked },
      this.addHighlightedLabels
    );
  };

  // CLEAR RESULTS
  clearResults = () => {
    this.setState({
      text: "",
      link: "",
      annotatedText: "",
      response: [],
    });
    const searchfield = document.querySelector(".MuiOutlinedInput-input");
    searchfield.value = "";
  };

  render() {
    return (
      <Container maxWidth='xl' className='main-container modal-main-container'>
        <Grid container spacing={4} justify='center' className='grid-container'>
          <Grid container className='grid-form-container'>
            <SearchBox
              handleSearch={this.handleSearch}
              handleChange={this.handleChangeLink}
              clearResults={this.clearResults}
            />

            <form className='main-form'>
              <Paper
                component='form'
                className='searchbar-wrapper textfield-wrapper'>
                <IconButton aria-label='menu'>
                  <TextFieldsIcon />
                </IconButton>
                <TextField
                  className='start-text'
                  multiline
                  rows={2}
                  onChange={this.handleChange}
                  id='outlined-basic'
                  label='Tekst do anotacji'
                  variant='outlined'
                  value={this.state.text}
                  type='search'
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => this.clearResults()}>
                        <ClearIcon color='disabled' fontSize='small' />
                      </IconButton>
                    ),
                  }}
                />
                <IconButton
                  type='submit'
                  aria-label='search'
                  onClick={this.handleSend}>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Grid container className='clear-container'>
                {/* <Button
                className='button-send'
                variant='outlined'
                color='primary'
                onClick={this.clearResults}
                >
             CZYŚĆ WYNIKI
              </Button> */}
              </Grid>
            </form>
          </Grid>

          <FormGroup row className='o-form'>
            <FormControlLabel
              className='ents-benefit-label'
              control={
                <Checkbox
                  checked={this.state.Benefit}
                  onChange={this.handleCheckbox}
                  name='Benefit'
                  value='benefit'
                  id='ents-benefit'
                  className='c-dropdown__trigger benefit'
                  color='primary'
                />
              }
              label='Benefit'
            />

            <FormControlLabel
              className='ents-company-label'
              control={
                <Checkbox
                  checked={this.state.Company}
                  onChange={this.handleCheckbox}
                  name='Company'
                  value='company'
                  id='ents-company'
                  className='c-dropdown__trigger company'
                  color='primary'
                />
              }
              label='Company'
            />
            <FormControlLabel
              className='ents-education-label'
              control={
                <Checkbox
                  checked={this.state.Education}
                  onChange={this.handleCheckbox}
                  name='Education'
                  value='education'
                  id='ents-education'
                  className='c-dropdown__trigger language'
                  color='primary'
                />
              }
              label='Education'
            />

            <FormControlLabel
              className='ents-experience-label'
              control={
                <Checkbox
                  checked={this.state.Experience}
                  onChange={this.handleCheckbox}
                  name='Experience'
                  value='experience'
                  id='ents-experience'
                  className='c-dropdown__trigger language'
                  color='primary'
                />
              }
              label='Experience'
            />

            <FormControlLabel
              className='ents-langSkill-label'
              control={
                <Checkbox
                  checked={this.state["Language skill"]}
                  onChange={this.handleCheckbox}
                  name='Language skill'
                  value='language skill'
                  id='ents-language-skill'
                  className='c-dropdown__trigger language'
                  color='primary'
                />
              }
              label='Language Skill'
            />

            <FormControlLabel
              className='ents-occuName-label'
              control={
                <Checkbox
                  checked={this.state["Occupation name"]}
                  onChange={this.handleCheckbox}
                  name='Occupation name'
                  value='occupation name'
                  id='ents-occupation-name'
                  className='c-dropdown__trigger occupation'
                  color='primary'
                />
              }
              label='Occupation name'
            />

            <FormControlLabel
              className='ents-profSkill-label'
              control={
                <Checkbox
                  checked={this.state["Professional skill"]}
                  onChange={this.handleCheckbox}
                  name='Professional skill'
                  value='professional skill'
                  id='ents-professional-skill'
                  className='c-dropdown__trigger proffesional'
                  color='primary'
                />
              }
              label='Professional Skill'
            />

            <FormControlLabel
              className='ents-softSkill-label'
              control={
                <Checkbox
                  checked={this.state["Soft skill"]}
                  onChange={this.handleCheckbox}
                  name='Soft skill'
                  value='soft skill'
                  id='ents-soft skill'
                  className='c-dropdown__trigger soft'
                  color='primary'
                />
              }
              label='Soft Skill'
            />
          </FormGroup>
          {this.state.response.length !== 0 && (
            <EndText text={this.state.annotatedText}></EndText>
          )}
        </Grid>
      </Container>
    );
  }
}

export default TextAnnotator;
