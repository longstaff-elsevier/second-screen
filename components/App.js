import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

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

const Reading = () => {
  return (
    <div>
      <ReadingView />
      <ReadingList />
    </div>
  );
};

export default App;
