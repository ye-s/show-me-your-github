import React, { Component } from 'react';
import './App.css';
import SearchUser from './modules/search/Search';

class App extends Component {
  render() {
    return (
      <div className="appWrapper">
        <div className="appHeader">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Check public repositories of any user!
          </p>
          <p>
            Simply type user login for GitHub.
          </p>
        </div>
        <SearchUser />
      </div>
    );
  }
}

export default App;
