import React from "react";
import { APISelected } from "../api/Selected.js";
import { APIReadingList } from "../api/ReadingList.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";

const Citation = ({ citation, open, add }) => {
  return (
    <div>
      <h1>{citation.title}</h1>
      <p>{citation.year}</p>
      <p>{citation.journal}</p>
      <p>{citation.authors.join(", ")}</p>

      <p>{citation.abstract}</p>

      <button onClick={add}>Add to Reading List</button>
      <button onClick={open}>Open article</button>
    </div>
  );
};

const CitationView = ({
  citation,
  addToReadingList,
  openArticle,
  clearCitation
}) => {
  const art = citation.length ? citation[0] : null;

  return art ? (
    <div>
      <a
        href="#"
        onClick={ev => {
          ev.preventDefault();
          clearCitation();
        }}
      >
        Close
      </a>
      <Citation
        citation={art}
        open={() => openArticle(art)}
        add={() => addToReadingList(art)}
      />
    </div>
  ) : (
    <div>No article selected</div>
  );
};

const DataCitationView = withTracker(({ id }) => {
  return {
    citation: APICitation.find({}).fetch(),
    addToReadingList: article => APIReadingList.insert(article),
    openArticle: article => {
      const now = APISelected.find({}).fetch();
      now.forEach(art => {
        APISelected.remove(art._id);
      });
      APISelected.insert(article);
    },
    clearCitation: () => {
      const now = APICitation.find({}).fetch();
      now.forEach(art => {
        APICitation.remove(art._id);
      });
    }
  };
})(CitationView);

export default DataCitationView;
