import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import CitationView from "./CitationView";
import AddToReadingList from "./AddToReadingList";
import ReadingList from "./ReadingList";
import ReadingView from "./ReadingView";

const browserHistory = createBrowserHistory();
const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/add" component={AddToReadingList} />
      <Route exact path="/cit" component={CitationView} />
      <Route component={Reading} />
    </Switch>
  </Router>
);

const ReadingGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2em;
`;

const Reading = () => {
  return (
    <ReadingGrid>
      <ReadingView />
      <ReadingList />
    </ReadingGrid>
  );
};

export default App;
