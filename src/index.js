import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// decided to move consts here, it makes app launching easier
const REACT_APP_API_BASE_URL= 'https://api.github.com/graphql';
const REACT_APP_GITHUB_ACCESS_TOKEN= 'Your GitHub access token';

const httpLink = new HttpLink({
    uri: REACT_APP_API_BASE_URL,
    headers: {
        authorization: `Bearer ${
            REACT_APP_GITHUB_ACCESS_TOKEN
        }`
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker();