import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { APIReadingList } from "../api/ReadingList.js";
import { withTracker } from "meteor/react-meteor-data";
import styled from "styled-components";
import {
  TokenText,
  TokenTitle,
  TokenButton,
  TokenButtonHolder,
  ColorHighlight,
  ColorBorder
} from "./tokens";

const StyledTitle = styled.h1`
  ${TokenTitle};
  margin: 0;
  padding: 0;
  font-size: 1.25em;
`;
const StyledSubtitle = styled.h2`
  ${TokenText};
  margin: 1rem 0 2rem;
  padding: 0;
  text-transform: uppercase;
`;
const StyledCitationList = styled.ol`
  margin: 0;
  padding: 0;
`;
const StyledCitationListItem = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledCitation = styled.div`
  padding: 1em;
  background: ${props => (props.active ? ColorHighlight : "transparent")};
  border-top: 1px solid ${props => (props.active ? ColorBorder : "transparent")};
  border-bottom: 1px solid
    ${props => (props.active ? ColorBorder : "rgb(235, 235, 235)")};
`;
const StyledCitationTitle = styled.h3`
  ${TokenTitle};
  margin: 0 0 0.5em;
`;
const StyledCitationButton = styled.button`
  ${TokenButton};
`;
const StyledCitationButtonHolder = styled.div`
  ${TokenButtonHolder} grid-template-columns: 1fr 1fr 1fr;
`;

const Citation = ({ citation, open, add, highlight }) => {
  return (
    <StyledCitation
      ref={ref => {
        if (ref && citation.active)
          ref.scrollIntoViewIfNeeded({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
      }}
      active={citation.active}
    >
      <StyledCitationTitle>{citation.title}</StyledCitationTitle>
      <p>{citation.year}</p>
      <p>{citation.journal}</p>
      <p>{citation.authors.join(", ")}</p>

      {citation.preview ? <p>{citation.preview}</p> : null}

      <StyledCitationButtonHolder>
        <StyledCitationButton onClick={add}>Add to List</StyledCitationButton>
        <StyledCitationButton onClick={open}>Preview</StyledCitationButton>
        <StyledCitationButton onClick={highlight}>
          Highlight
        </StyledCitationButton>
      </StyledCitationButtonHolder>
    </StyledCitation>
  );
};

const CitationView = ({
  article,
  addToReadingList,
  openArticle,
  highlightMe
}) => {
  const art = article.length ? article[0] : null;

  return art ? (
    <div>
      <StyledTitle>{art.title}</StyledTitle>
      <StyledSubtitle>Citations</StyledSubtitle>

      {art.citations.length ? (
        <StyledCitationList>
          {art.citations.map((cit, ind) => (
            <StyledCitationListItem key={ind}>
              <Citation
                citation={cit}
                open={() => openArticle(cit)}
                add={() => addToReadingList(cit)}
                highlight={() => highlightMe(art, ind)}
              />
            </StyledCitationListItem>
          ))}
        </StyledCitationList>
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
    },
    highlightMe: (article, citInd) => {
      APISelected.update(article._id, {
        $set: {
          citations: article.citations.map((cit, ind) => ({
            ...cit,
            active: ind === citInd
          }))
        }
      });
    }
  };
})(CitationView);

export default DataCitationView;
