import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { USER_REPOSITORIES_QUERY } from "../user/queries";
import { Query } from 'react-apollo';

const ReposWrapper = () => (<div></div>);
// const ReposList = ({ login }) => (
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
            // return <div>{error}</div>;
          }
          const { repositoryOwner } = data;

          if (loading && !repositoryOwner) {
            return (<div>Loading...</div>);
          }
          const { repositories } = repositoryOwner;
          const { endCursor } =  repositories.pageInfo;

          const reposList = repositories.edges.map((repo, index) => {
            const { name, primaryLanguage, description } = repo.node;
            console.log(repo.node);
            console.log('dddd');
            const languageName = primaryLanguage ? primaryLanguage.name : null;
            return (
                <div key={ index.toString() + repo.name }>
                  <p><span>{name}</span>{languageName ? `, main language - ${languageName}` : ''}</p> 
                  <p>{description}</p>
                  <p></p>
                </div>
            )
          });

          const showMoreRepos = ''
          return (
            <div>
              { reposList }
              {/* <ReposList
              // loading={loading}
              repositories={repositories}
              fetchMore={fetchMore}
              entry={'organization'}
            /> */}

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