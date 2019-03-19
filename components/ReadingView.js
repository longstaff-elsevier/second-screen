import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";

const parseText = (text, citations, openCitation, highlight) => {
  const split = text.split(/\{\{|\}\}/);

  return (
    <div>
      {split.map((txt, ind, cit) => {
        if (ind % 2 === 0) {
          return <span>{txt}</span>;
        } else {
          const cit = Math.floor(ind / 2);
          return (
            <a
              href="#"
              onClick={ev => {
                ev.preventDefault();
                openCitation(citations[cit]);
              }}
              onMouseEnter={() => highlight(cit)}
              onMouseLeave={() => highlight(-1)}
              style={{
                background: citations[cit].selected
                  ? "red"
                  : citations[cit].active ? "yellow" : "transparent"
              }}
              ref={ref => {
                if (ref && (citations[cit].selected || citations[cit].active))
                  ref.scrollIntoViewIfNeeded({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest"
                  });
              }}
            >
              {txt}
            </a>
          );
        }
      })}
    </div>
  );
};

const ReadingView = ({ article, openCitation, highlightCitation }) => {
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

const DataReadingView = withTracker(({ id }) => {
  const sel = APISelected.find({}).fetch();
  const activeCit = APICitation.find({}).fetch();

  if (sel.length && activeCit.length) {
    sel[0].citations = sel[0].citations.map(cit => {
      return {
        ...cit,
        selected: activeCit[0].title === cit.title
      };
    });
  }

  return {
    article: sel,
    openCitation: cit => {
      const now = APICitation.find({}).fetch();
      now.forEach(art => {
        APICitation.remove(art._id);
      });
      APICitation.insert(cit);
    },
    highlightCitation: citInd => {
      const current = APISelected.find({}).fetch();
      const selected = current[0];
      if (selected) {
        APISelected.update(selected._id, {
          $set: {
            citations: selected.citations.map((cit, ind) => ({
              ...cit,
              active: ind === citInd
            }))
          }
        });
      }
    }
  };
})(ReadingView);

export default DataReadingView;
