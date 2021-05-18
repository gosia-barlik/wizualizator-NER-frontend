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
  Checkbox,
} from "@material-ui/core";
import { EndText } from "./EndText.jsx";
import Switch from "@material-ui/core/Switch";
import config from "../../config";

export class TextAnnotator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      annotatedText: "",
      response: [],
      Benefit: true, //TODO: zagnieżdzonme propertisy, zamienić na zwracane z backendu code namy
      Company: true,
      "Soft skill": true,
      "Professional skill": true,
      "Language skill": true,
      Experience: true
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
          response: data,
        });
      })
      .then(() => {
        this.addHighlightedLabels();
        // this.animateLabels();
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
    }
  };

  highlightLabels = (annotation, i, baseText) => {
    const startSpan = `<span class="${this.getClass(annotation)}">`;
    const endSpan = `<span class="annotation-name"> ${this.getClass(annotation)} </span></span>`;
    const spansLength = (startSpan.length + endSpan.length) * i;

    const startPosition = annotation.start_char + spansLength;

    const endPosition = startPosition + (annotation.end_char - annotation.start_char);
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
      }});

      this.setState({annotatedText: baseText});
  };

  // animateLabels = () => {

  //   const correctedTextLabel = document.querySelector("#correctedTextLabel");
  //   const keyframes = [
  //     { transform: "translateY(0px) translateX(0px) scale(1)" },
  //     { transform: "translateY(-30px) translateX(-40px) scale(0.82)" },
  //   ];
  //   const timing = {
  //     duration: 300,
  //     iterations: 1,
  //     fill: "forwards",
  //   };
  //   correctedTextLabel.animate(keyframes, timing);

  // };

  //HANDLE CHECKBOX
  handleCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked }, this.addHighlightedLabels);
    // this.handleSend();
    
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
              variant='outlined'
              color='primary'
              onClick={this.handleSend}>
              {" "}
              WYŚLIJ{" "}
            </Button>
          </form>

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
              className='ents-softSkill-label'
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
              className='ents-profSkill-label'
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
              className='ents-langSkill-label'
              control={
                <Checkbox
                  checked={this.state["Language skill"]}
                  onChange={this.handleCheckbox}
                  name='Language skill'
                  value='language skill'
                  id='ents-language skill'
                  className='c-dropdown__trigger language'
                  color='primary'
                />
              }
              label='Language Skill'
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
          </FormGroup>
          <EndText text={this.state.annotatedText}></EndText>
        </Grid>
      </Container>
    );
  }
}

export default TextAnnotator;
