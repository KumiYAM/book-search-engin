import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  //gql,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
//import LoginForm from './components/LoginForm';
import Navbar from "./components/Navbar";
//import SignupForm from './components/SignupForm';

// const httpLink = createHttpLink({
//   uri: "/graphql"
// });
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" pages={SearchBooks} />
            <Route exact path="/saved" pages={SavedBooks} />
            <Route render={() => <h1 className="display-2">WrongPage!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
