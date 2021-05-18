import React, { Component } from "react";
import { Header } from "./components/common/Header.jsx";
import TextAnnotator  from "./components/textAnnotator/TextAnnotator"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className='App'>
            <Header />
            <>
              <Switch>
                <Route exact path='/'>
                  <TextAnnotator/>
                </Route>
              </Switch>
            </>
          </div>
        </BrowserRouter>
      </>
    );
  }
}
export default App;
