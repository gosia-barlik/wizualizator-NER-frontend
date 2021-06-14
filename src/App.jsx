import React, { Component } from "react";
import { Header } from "./components/common/Header.jsx";
import TextAnnotator from "./components/textAnnotator/TextAnnotator";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <TextAnnotator />
      </div>
    );
  }
}
export default App;
