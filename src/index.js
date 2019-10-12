import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql-beta"
});

const shopId = 'cmVhY3Rpb24vc2hvcDpKOEJocTN1VHRkZ3daeDNyeg==';

const query = gql`
  query catalogItemsQuery($shopId: ID!, $first: ConnectionLimitInt, $last:  ConnectionLimitInt, $before: ConnectionCursor, $after: ConnectionCursor, $sortBy: CatalogItemSortByField, $sortByPriceCurrencyCode: String, $sortOrder: SortOrder) {
    catalogItems(shopIds: [$shopId], first: $first, last: $last, before: $before, after: $after, sortBy: $sortBy, sortByPriceCurrencyCode: $sortByPriceCurrencyCode, sortOrder: $sortOrder) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          _id
          ... on CatalogItemProduct {
            product {
              _id
              title
              slug
              description
              vendor
              pricing {
                compareAtPrice {
                  displayAmount
                }
                displayPrice
              }
              primaryImage {
                URLs {
                  small
                }
              }
            }
          }
        }
      }
    }
  }
`;

client.query({
  query: query,
  variables: {
    shopId: shopId
  }
})
.then(res => console.log(res));

render(<App />, document.getElementById("root"));