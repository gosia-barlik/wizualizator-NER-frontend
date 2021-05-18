import React, { Component } from "react";
import parse from "html-react-parser";

export class HighlightedText extends Component {
  // renderErrors() {
  //   let i = 0;
  //   return this.props.errors.map((item) => (
  //     <div key={i++}>{item.message} </div>
  //   ));
  // }

  render() {
    return (
      <div className='highlighted-text-container' onBlur={this.onChange}>
        <div className="highlighted-text">
          <p id='highlightedTextLabel'>Popełnione błędy</p>
          <div id='highlighted' className='highlighted-innertext'>
            {parse(this.props.originalHighlightedText)}
          </div>
        </div>
      </div>
    );
  }
}
