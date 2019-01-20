import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_BASE_URL,
    headers: {
        authorization: `Bearer ${
            process.env.REACT_APP_GITHUB_ACCESS_TOKEN
        }`,
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