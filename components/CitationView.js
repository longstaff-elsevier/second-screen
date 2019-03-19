import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";

import CitationDocumentView from "./CitationDocumentView";
import CitationListView from "./CitationListView";

const CitationView = ({ article, citation }) =>
  citation.length ? (
    <CitationDocumentView />
  ) : article.length ? (
    <CitationListView />
  ) : (
    <p>No citation information</p>
  );

const DataCitationView = withTracker(({ id }) => {
  return {
    article: APISelected.find({}).fetch(),
    citation: APICitation.find({}).fetch()
  };
})(CitationView);

export default DataCitationView;
