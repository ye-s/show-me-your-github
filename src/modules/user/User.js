import React, { Component } from "react";
import { withApollo } from "react-apollo";
import ReposList from '../repos/ReposList';

class User extends Component {

  state = {
    showFetchedRepositories: false
  };

  prepareUserParameter = (paramName, paramValue) => {
    let parameterTemplate = paramValue 
      ? (
          <p className="userParam" key={paramName}>
            <span className="userParamName">{paramName}</span>: {paramValue}
          </p>
        )
      : null
    return parameterTemplate;
  }

  getUserParamsAsArray = (userData) => {
    let resultKeysArray = Object.keys(userData).map((objKey) => {
      let paramValue = userData[objKey];
      return this.prepareUserParameter(objKey, paramValue);
    })
    return resultKeysArray;
  }

  showRepositories = () => {
    const { login } = this.props.userData;
    return (
      <ReposList login = {login} />
    );
  }

  fetchRepositories = (e) => {
    e.preventDefault();
    const { login } = this.props.userData;
    this.setState({ showFetchedRepositories: true });
    return (
      <ReposList login = {login} />
    )
  }

  render() {
    const { userData } = this.props;
    const { showFetchedRepositories } = this.state; 
    let userParams = this.getUserParamsAsArray(userData);
    
    return (
      <div className="userInfoBlock">
        <div>
          { userParams.map(param => (param)) }
        </div>
        <div>
          <button onClick={this.fetchRepositories}>Get user repos</button>
          {
            showFetchedRepositories
            ? this.showRepositories()
            : null
          }
        </div>
      </div>
    );
  }
}
export default withApollo(User);
