import React, { Component } from "react";
import {
    Typography,
    Grow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export class GrowAccordionElem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grow
        in='true'
        id={this.props.skill.id}
        style={{ transformOrigin: "0 0 0" }}
        timeout={Math.pow(this.props.skill.distance * 200, 2)}
        className='grow-container-skills'>
        <Accordion className='accordion-skill'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>{this.props.skill["ESCO skill"]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align='left'>
              <strong>Opis kwalifikacji:</strong>
              <br></br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grow>
    );
  }
}
