import React, { Component } from 'react';
import Repo from './Repo';
import { USER_REPOSITORIES_QUERY } from "../user/queries";
import { Query } from 'react-apollo';

class ReposList extends Component {
  
  state = {
    reposCursor: null
  };

  render() {
    const { login} = this.props;
    return (
      <Query
        query={USER_REPOSITORIES_QUERY}
        variables={{
          userLogin: login,
          reposCursor: null
        }}
        skip={login === ''}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error, fetchMore }) => {
          if (error) {
            console.log(error);
          }
          const { repositoryOwner } = data;

          if (loading && !repositoryOwner) {
            return (<div className="loading">Loading...</div>);
          }
          const { repositories } = repositoryOwner;

          const reposList = repositories.edges.map((repo, index) => {
            const { name, primaryLanguage, description, createdAt } = repo.node;
            const language = primaryLanguage ? primaryLanguage.name : null;
            const dateCreated = createdAt.slice(0, 10);
            return (
                <Repo repoName={name}
                      language={language}
                      dateCreated={dateCreated}
                      description={description}
                />
            )
          });

          return (
            <div>
              { reposList }

            <div>
              { 
                repositories.pageInfo.hasNextPage && (
                  <button onClick={() => fetchMore({
                    variables: {
                      userLogin: login,
                      reposCursor: repositories.pageInfo.endCursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newRepos = fetchMoreResult.repositoryOwner.repositories;
                      const newEdges = newRepos.edges;
                      const pageInfo = newRepos.pageInfo;

                      return newEdges.length 
                        ? {
                            ...previousResult,
                            repositoryOwner: {
                              ...previousResult.repositoryOwner,
                              __typename: previousResult.repositoryOwner.__typename,
                              repositories: {
                                ...previousResult.repositoryOwner.repositories,
                                __typename: previousResult.repositoryOwner.repositories.__typename,
                                edges: [...previousResult.repositoryOwner.repositories.edges, ...newEdges],
                                pageInfo
                              }
                            }
                          }
                        : previousResult
                    }
                  })
              }>Show more user repos</button>
          )}
            </div>
            
            </div>
          );
        }}
      </Query>
    )
  }
}

export default ReposList;