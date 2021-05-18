import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Grow,
  FormControlLabel,
  FormGroup,
  Checkbox
} from "@material-ui/core";
import { EndText } from "./EndText.jsx";
import { HighlightedText } from "./HighlightedText.jsx";
import Switch from "@material-ui/core/Switch";
import config from "../../config"


export class TextAnnotator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ' ',
      annotatedText:'',
      response: [],
      'Benefit': true, //TODO: zagnieżdzonme propertisy, zamienić na zwracane z backendu code namy
      'Company': true,
      'Soft skill': true,
      'Professional skill': true,
      'Language skill': true,
     
      // errors: [],
      // inParam: false,
      // isAlertActive: false,
      // currentlyDisplayedError: {},
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
    this.setState({
      text: e.target.value,
    });
  };

  // HANDLE CHANGE THE REQUEST
  handleSend = (e) => {
    // e.preventDefault();
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
        this.sortLabels(data);
        this.setState({
          response: data
        })
        console.log(data);
      })
      .then(() => {
      this.addHighlightedLabels();
     
      });
  };

  sortLabels = (data) => {
   data.sort((a,b) => (a.start_char > b.start_char) ? 1 : ((b.start_char > a.start_char) ? -1 : 0))
  }

  getClass = (annotation) => {
    switch (annotation.label) {
      case 'Benefit':
        return('benefit');
    
      case 'Company':
        return('company');

      case 'Soft skill':
        return('softskl');

      case 'Professional skill':
          return('profskl');

      case 'Language skill':
          return('langskl');
  }
}

  highlightLabels = (annotation, i) => {
 
    const startSpan = `<span class="${this.getClass(annotation)}">`;
    const endSpan = `</span>`;
    const spansLength = (startSpan.length + endSpan.length) * i;

    const str = this.state.annotatedText;
    const startPosition = annotation.start_char + spansLength;

    const endPosition = startPosition + (annotation.end_char - annotation.start_char);
    const newStr = str.splice(endPosition, 0, endSpan);
    let endStr = newStr.splice(startPosition, 0, startSpan);
    console.log(endStr)
   
    this.setState({
      annotatedText: endStr,
    });
    return startPosition, endPosition;
  };

  addHighlightedLabels = () => {
    let i = 0;
    this.setState({
      annotatedText: this.state.text
    });
    this.state.response.map((annotation) => {
      if(this.state[annotation.label]){
      this.highlightLabels(annotation, i);
      i++}
    });
  };


//HANDLE CHECKBOX
handleCheckbox = (event)=> {
 
   this.setState({ [event.target.name]: event.target.checked });
   this.handleSend();
  //  this.addHighlightedLabels();
 };

  render() {
    return (
      <Container maxWidth='xl' className='main-container modal-main-container'>

        <Grid container spacing={4} justify='center' className='grid-container'>

          <form className='main-form'>
            <TextField
              className='start-text'
              multiline
              rows={2}
              onChange={this.handleChange}
              id='outlined-basic'
              label='Tekst do anotacji'
              variant='outlined'
              value={this.state.text}
            />

            <Button
              className='button-send'
              variant="outlined"
              color='primary'
              onClick={this.handleSend}>
              {" "}
              WYŚLIJ{" "}
            </Button>
          </form>

          <FormGroup row className='o-form'>
            <FormControlLabel
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
            className="ents-company-label"
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
              control={
                <Checkbox
                checked={this.state["Soft skill"]}
                onChange={this.handleCheckbox}
                  name='Soft skill'
                  // name='ents'
                  value='soft skill'
                  id='ents-soft skill'
                  className='c-dropdown__trigger soft'
                  color='primary'
                />
              }
              label='Soft Skill'
            />

            <FormControlLabel
              control={
                <Checkbox
                checked={this.state["Professional skill"]}
                onChange={this.handleCheckbox}
                  name='Professional skill'
                  value='professional skill'
                  id='ents-professional skill'
                  className='c-dropdown__trigger proffesional' 
                  color='primary'
                />
              }
              label='Professional Skill'
            />

            <FormControlLabel
              control={
                <Checkbox
                checked={this.state["Language skill"]}
                onChange={this.handleCheckbox}
                  name='checkedLS'
                  value='language skill'
                  id='ents-language skill'
                  className='c-dropdown__trigger language'
                  color='primary'
                />
              }
              label='Language Skill'
            />
          </FormGroup>
          <EndText
            text={this.state.annotatedText}
            >
          </EndText>

        </Grid>

     
      </Container>
    );
  }
}

export default TextAnnotator;