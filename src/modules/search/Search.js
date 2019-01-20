import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { SEARCH_USER_QUERY } from "./queries";
import User from "../user/User";

class Search extends Component {
  state = {
    searchInput: "",
    isSearching: false,
    showLoading: false,
    userData: {},
    isUserFetched: false,
    error: null
  };

  searchForUser = async (e) => {
    e.preventDefault();
    let user;
    let result;

    if (!this.state.searchInput) {
      return;
    }
    this.setState((prevState) => ({
      userData: {},
      isUserFetched: false,
      showLoading: true
    }));

    result = await this.props.client.query({
      query: SEARCH_USER_QUERY,
      variables: { userLogin: this.state.searchInput },
      loading: true,
      errorPolicy: 'all'
    });

    if (result.data.user) {
      user = this.prepareUserData(result.data.user);

      //This trick is used to check if object is populated
      if (Object.prototype.hasOwnProperty.call(user, "login")) {
        this.setState({ isUserFetched: true });
      }
    } else if (result.error) {
      this.setState((prevState) => ({
        showLoading: !prevState.showLoading,
        isSearching: !prevState.isSearching,
        error: result.error[0].message
      }));
      return;
    }

    this.setState((prevState) => ({
      showLoading: !prevState.showLoading,
      isSearching: !prevState.isSearching,
      userData: user
    }));
  };

  saveSearchInput = e => {
    if (e.target.value) {
      this.setState({ searchInput: e.target.value });
    }
  };

  showLoading = () => {
    return this.state.showLoading ? (<div className="loading">Loading...</div>) : null;
  }

  prepareUserData = incomeUserObj => {
    let userData = {};
    const {
          name,
          login,
          email,
          url,
          bio,
          location,
          company,
          followers,
          repositories,
          organizations
        } = incomeUserObj;

    userData = {
      name,
      login,
      email,
      url,
      bio,
      location,
      company,
      followers: followers.totalCount,
      repositories: repositories.totalCount,
      organizations: organizations.totalCount
    };

    return userData;
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13){
      this.searchForUser(e);
    }
  }


  render() {
    const { 
      userData,
      isUserFetched,
      error
    } = this.state;
    
    return (
      <div className="searchWrapper">
        <div>
          <input className="searchInput"
                 type="text"
                 onChange={this.saveSearchInput}
                 onKeyDown={this.onEnterPress}
          />
          <button className="searchButton"
                  onClick={this.searchForUser}>Search for user</button>
        </div>
        <div>
          {this.showLoading()}
          {
            isUserFetched && !error 
              ? (<User userData={userData} />)
              : (<div className="errorMessage">{error}</div>)
          }
        </div>
      </div>
    );
  }
}
export default withApollo(Search);
