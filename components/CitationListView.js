import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { APIReadingList } from "../api/ReadingList.js";
import { withTracker } from "meteor/react-meteor-data";

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
      <button onClick={open}>Preview article</button>
    </div>
  );
};

const CitationView = ({ article, addToReadingList, openArticle }) => {
  const art = article.length ? article[0] : null;

  return art ? (
    <div>
      <h1>{art.title}</h1>
      <p>Citations</p>

      {art.citations.length ? (
        <ol>
          {art.citations.map((cit, ind) => (
            <li key={ind}>
              <Citation
                citation={cit}
                open={() => openArticle(cit)}
                add={() => addToReadingList(cit)}
              />
            </li>
          ))}
        </ol>
      ) : (
        <p>No citations found</p>
      )}
    </div>
  ) : (
    <div>No article selected</div>
  );
};

const DataCitationView = withTracker(({ id }) => {
  return {
    article: APISelected.find({}).fetch(),
    addToReadingList: article => APIReadingList.insert(article),
    openArticle: article => {
      const now = APICitation.find({}).fetch();
      now.forEach(art => {
        APICitation.remove(art._id);
      });
      APICitation.insert(article);
    }
  };
})(CitationView);

export default DataCitationView;
