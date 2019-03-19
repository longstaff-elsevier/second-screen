import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import AddToReadingList from "./AddToReadingList";
import CitationPage from "./CitationPage";
import ReadingPage from "./ReadingPage";
import MainView from "./MainView";

const browserHistory = createBrowserHistory();
const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/add" component={AddToReadingList} />
      <Route exact path="/reading" component={ReadingPage} />
      <Route exact path="/cit" component={CitationPage} />
      <Route component={MainView} />
    </Switch>
  </Router>
);

export default App;
