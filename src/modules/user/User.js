import React, { Component } from "react";
import { withApollo } from "react-apollo";

class User extends Component {
  render() {
    // const {} = this.props.userInfo;
    return (
      <div>
        <p>test</p>
      </div>
    );
  }
}
export default withApollo(User);
