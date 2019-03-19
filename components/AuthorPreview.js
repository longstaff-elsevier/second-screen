import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";

const AuthorPreview = ({ author }) => {
  const art = article.length ? article[0] : null;

  return art ? (
    <div>
      <h1>{art.title}</h1>
      <p>{art.abstract}</p>
      {parseText(
        art.text ? art.text : art.abstract,
        art.citations,
        openCitation,
        highlightCitation
      )}
    </div>
  ) : (
    <div>No article selected</div>
  );
};

const DataReadingView = withTracker(({ name }) => {
  return {
    author: APICitation.find({ name }).fetch()
  };
})(ReadingView);

export default DataReadingView;
