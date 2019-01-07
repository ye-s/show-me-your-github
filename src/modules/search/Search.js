import React, { Component } from "react";
import "./search.css";
import { withApollo } from "react-apollo";
import { SEARCH_USER_QUERY } from "./queries";
import { User } from "../user/User";

class Search extends Component {
  state = {
    searchInput: "",
    isSearching: false,
    showLoading: false,
    userInfo: null
  };

  searchForUser = async e => {
    e.preventDefault();
    this.setState({
      userInfo: false,
      showLoading: true
    });
    const result = await this.props.client.query({
      query: SEARCH_USER_QUERY,
      variables: { userLogin: this.state.searchInput },
      loading: true
    });
    const user = result.data.user;
    this.setState({
      showLoading: false,
      isSearching: true,
      userInfo: user
    });
  };

  saveSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    return (
      <>
        <div>
          <input type="text" onChange={this.saveSearchInput} />
          <input
            type="submit"
            value="Search for user"
            onClick={this.searchForUser}
          />
        </div>
        <div>
          {this.state.showLoading ? <div>Loading...</div> : null}
          {this.state.userInfo ? <div>Result</div> : null}
        </div>
        {/* <Query query={SEARCH_USER_QUERY} variables={{login: ''}}>
          {({ data: { user }, loading }) => {
            if (loading || !user) {
                return <div>Loading ...</div>;
            }

            return (
              <div>Success!</div>
              // <Repositories repositories={organization.repositories} />
            );
          }}
        </Query> */}
      </>
    );
  }
}
export default withApollo(Search);
