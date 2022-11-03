import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/pagination/core-api/#merging-paginated-results
      typePolicies: {
      Query: {
        fields: {
          unsplashImages: {
            keyArgs: false,
            merge(existing = [], incoming, {args: {pageNum = 1}}) {
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              const offset = pageNum <= 1 ? 0 : (pageNum - 1) * 10
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        userPostedImages: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return incoming
          }
        }
        },
      },
    }
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  // </React.StrictMode>
);
// need to remove chakra portal otherwise i get html validator errors
setTimeout(() => {
  const body = document.getElementById('react-body')
  body.removeChild(body.lastChild)
}, 1)
// portal.remove()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
