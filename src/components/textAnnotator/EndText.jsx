import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import parse from "html-react-parser";


export class EndText extends Component {

  render() {
    return (
      <div className='end-text' onBlur={this.onChange}>
        <div className='end-text-item'>
          <div>
            <p id='correctedTextLabel'>Tekst anotowany</p>
            <div className='corrected-text'>{parse(this.props.text)}</div>
          </div>
        </div>
      </div>
    );
  }
}
