import React from "react";
import { APIReadingList } from "../api/ReadingList.js";
import { withTracker } from "meteor/react-meteor-data";
import { articles } from "../api/articles";

const AddToReadingList = ({ addToReadingList }) => {
  return (
    <div>
      <h1>{`Add to Reading List`}</h1>

      <ol>
        {articles.map((art, key) => (
          <li key={key}>
            <a
              href="#"
              onClick={ev => {
                ev.preventDefault();
                addToReadingList(art);
              }}
            >
              {`Add ${art.title}`}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const DataAddToReadingList = withTracker(({ id }) => {
  return {
    addToReadingList: article => APIReadingList.insert(article)
  };
})(AddToReadingList);

export default DataAddToReadingList;
