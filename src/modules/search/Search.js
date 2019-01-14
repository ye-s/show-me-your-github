import React, { Component, Fragment } from "react";
import "./search.css";
import { withApollo } from "react-apollo";
import { SEARCH_USER_QUERY } from "./queries";
import User from "../user/User";

class Search extends Component {
  state = {
    searchInput: "",
    isSearching: false,
    showLoading: false,
    userData: {}
  };

  searchForUser = async (e) => {
    e.preventDefault();
    this.setState({
      showLoading: true,
      userData: {}
    });

    const result = await this.props.client.query({
      query: SEARCH_USER_QUERY,
      variables: { userLogin: this.state.searchInput },
      loading: true
    });

    const user = this.prepareUserData(result.data.user);

    this.setState({
      showLoading: false,
      isSearching: true,
      userData: user
    });
  };

  saveSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  showLoading = () => {
    return this.state.showLoading ? (<div>Loading...</div>) : null;
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


  render() {
    const { userData } = this.state;
    let isUserFetched = false;

    //This trick is used to check if object is populated
    if (Object.prototype.hasOwnProperty.call(userData, "login")) {
      isUserFetched = true;
    }
    
    return (
      <Fragment>
        <div>
          <input type="text" onChange={this.saveSearchInput} />
          <input
            type="submit"
            value="Search for user"
            onClick={this.searchForUser}
          />
        </div>
        <div>
          {this.showLoading()}
          {
            isUserFetched 
            ? <User userData={userData}/> 
            : null
          }
        </div>
      </Fragment>
    );
  }
}
export default withApollo(Search);
