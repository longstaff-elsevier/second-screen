import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";

import CitationDocumentView from "./CitationDocumentView";
import CitationListView from "./CitationListView";

const Citation = ({ citation, open, add }) => {
  return (
    <div
      style={{ background: citation.active ? "yellow" : "transparent" }}
      ref={ref => {
        if (ref && citation.active)
          ref.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
      }}
    >
      <h1>{citation.title}</h1>
      <p>{citation.year}</p>
      <p>{citation.journal}</p>
      <p>{citation.authors.join(", ")}</p>

      {citation.preview ? <p>{citation.preview}</p> : null}

      <button onClick={add}>Add to Reading List</button>
      <button onClick={open}>Open article</button>
    </div>
  );
};

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
