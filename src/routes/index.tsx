import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./home/Home";
import Calculator from "./calculator/Calculator";
import DependencyExplorer from "./dependency-explorer/DependencyExplorer";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/calculator'} component={Calculator}/>
          <Route path={'/dependency-explorer'} component={DependencyExplorer}/>
        </Switch>
      </Router>
    )
  }
}

export default Routes