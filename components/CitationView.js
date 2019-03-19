import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { APIMount } from "../api/Mount.js";
import { withTracker } from "meteor/react-meteor-data";

import CitationDocumentView from "./CitationDocumentView";
import CitationListView from "./CitationListView";

class CitationView extends React.Component {
  render() {
    const { article, citation } = this.props;

    return citation.length ? (
      <CitationDocumentView />
    ) : article.length ? (
      <CitationListView />
    ) : (
      <p>No citation information</p>
    );
  }
}
const DataCitationView = withTracker(({ id }) => {
  return {
    article: APISelected.find({}).fetch(),
    citation: APICitation.find({}).fetch()
  };
})(CitationView);

export default DataCitationView;
