import React from "react";
import {Link} from "react-router-dom";
import './styles.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <span className={'welcome-text'}>Welcome,</span>
        <span className={'select-demo-text'}>please select a demo</span>
        <Link className={'calculator-button'} to={'/calculator'}>Calculator</Link>
        <Link className={'dependency-explorer-button'} to={'/dependency-explorer'}>Dependency Explorer</Link>
      </div>
    )
  }
}

export default Home