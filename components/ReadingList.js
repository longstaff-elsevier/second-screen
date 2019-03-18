import React from "react";
import { APIReadingList } from "../api/ReadingList.js";
import { APISelected } from "../api/Selected.js";
import { withTracker } from "meteor/react-meteor-data";

const ReadingList = ({ readingList, setActive, removeFromList }) => {
  return (
    <div>
      <h1>{`Reading List (${readingList.length})`}</h1>
      <ol>
        {readingList.map(art => (
          <li key={art._id}>
            <a
              href="#"
              onClick={ev => {
                ev.preventDefault();
                setActive(art);
              }}
            >
              {art.title}
            </a>
            <a
              href="#"
              onClick={ev => {
                ev.preventDefault();
                removeFromList(art);
              }}
            >
              Remove
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const DataReadingList = withTracker(({ id }) => {
  return {
    readingList: APIReadingList.find({}).fetch(),
    setActive: art => {
      const now = APISelected.find({}).fetch();
      now.forEach(art => {
        APISelected.remove(art._id);
      });
      APISelected.insert(art);
    },
    removeFromList: art => APIReadingList.remove(art._id)
  };
})(ReadingList);

export default DataReadingList;
