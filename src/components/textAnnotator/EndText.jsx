import React, { Component } from "react";
import parse from "html-react-parser";

export class EndText extends Component {

  render() {
    return (
      <div className='end-text' onBlur={this.onChange}>
        <div className='end-text-item'>
          <div>
            <p id='correctedTextLabel'></p>
            <div className='corrected-text'>{parse(this.props.text)}</div>
          </div>
        </div>
      </div>
    );
  }
}
