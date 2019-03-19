import React from "react";
import { APIReadingList } from "../api/ReadingList.js";
import { APISelected } from "../api/Selected.js";
import { withTracker } from "meteor/react-meteor-data";
import styled from "styled-components";
import {
  TokenText,
  TokenTitle,
  TokenButton,
  TokenButtonHolder,
  ColorBorder,
  ColorTitle
} from "./tokens";

const StyledTitle = styled.h1`
  ${TokenTitle};
  margin: 0;
  padding: 0;
  font-size: 2em;
`;
const StyledReadingList = styled.ol`
  margin: 2em 0;
  padding: 0;
  list-style: none;
`;
const StyledReadingListItem = styled.li`
  margin: 0;
  padding: 1em 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
`;
const StyledLink = styled.a`
  color: ${props => (props.active ? ColorTitle : ColorBorder)};
  text-decoration: none;
  margin: 0 0 0.5em;
  display: block;
`;
const StyledButton = styled.button`
  ${TokenButton};
  display: block;
`;

const ReadingList = ({ readingList, setActive, removeFromList }) => {
  return (
    <div>
      <StyledTitle>{`Reading List (${readingList.length})`}</StyledTitle>
      <StyledReadingList>
        {readingList.map(art => (
          <StyledReadingListItem key={art._id}>
            <StyledLink
              href="#"
              onClick={ev => {
                ev.preventDefault();
                setActive(art);
              }}
              active={art.active}
            >
              {art.title}
            </StyledLink>
            <StyledButton
              onClick={ev => {
                ev.preventDefault();
                removeFromList(art);
              }}
            >
              Remove
            </StyledButton>
          </StyledReadingListItem>
        ))}
      </StyledReadingList>
    </div>
  );
};

const DataReadingList = withTracker(({ id }) => {
  const active = APISelected.find({}).fetch();
  const reading = APIReadingList.find({}).fetch();

  return {
    readingList: active.length
      ? reading.map(
          list =>
            list.title === active[0].title ? { ...list, active: true } : list
        )
      : reading,
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
