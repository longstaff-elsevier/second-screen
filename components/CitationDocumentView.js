import React from "react";
import { APISelected } from "../api/Selected.js";
import { APIReadingList } from "../api/ReadingList.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";
import styled from "styled-components";
import {
  TokenText,
  TokenTitle,
  TokenButton,
  TokenButtonHolder
} from "./tokens";
const StyledCitationButton = styled.button`
  ${TokenButton};
`;
const StyledCloseButton = styled.button`
  ${TokenButton};
  margin-bottom: 2em;
`;
const StyledCitationButtonHolder = styled.div`
  ${TokenButtonHolder} grid-template-columns: 1fr 1fr;
`;
const StyledTitle = styled.h1`
  ${TokenTitle};
  margin: 0;
  padding: 0;
  font-size: 1.25em;
`;
const StyledP = styled.p`
  ${TokenText};
  margin: 1rem 0 2rem;
  padding: 0;
`;

const Citation = ({ citation, open, add }) => {
  return (
    <div>
      <StyledTitle>{citation.title}</StyledTitle>
      <StyledP>{citation.year}</StyledP>
      <StyledP>{citation.journal}</StyledP>
      <StyledP>{citation.authors.join(", ")}</StyledP>

      <StyledP>{citation.abstract}</StyledP>

      <StyledCitationButtonHolder>
        <StyledCitationButton onClick={add}>
          Add to Reading List
        </StyledCitationButton>
        <StyledCitationButton onClick={open}>Open article</StyledCitationButton>
      </StyledCitationButtonHolder>
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
      <StyledCloseButton
        onClick={ev => {
          ev.preventDefault();
          clearCitation();
        }}
      >
        Close
      </StyledCloseButton>
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
