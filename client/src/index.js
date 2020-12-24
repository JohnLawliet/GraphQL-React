import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost'
import {BrowserRouter as Router} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import reportWebVitals from './reportWebVitals';


const client = new ApolloClient({
  uri: 'https://graphql-youtube.herokuapp.com/graphql'
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>    
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
