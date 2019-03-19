import React from "react";
import { APISelected } from "../api/Selected.js";
import { APICitation } from "../api/Citation.js";
import { withTracker } from "meteor/react-meteor-data";
import styled from "styled-components";
import {
  TokenText,
  TokenTitle,
  TokenButton,
  TokenButtonHolder,
  ColorBorder,
  ColorHighlight,
  ColorActive
} from "./tokens";

const StyledTitle = styled.h1`
  ${TokenTitle};
  margin: 0;
  padding: 0;
  font-size: 2em;
`;
const StyledMeta = styled.p`
  ${TokenTitle};
  font-size: 1.1em;
  line-height: 1.25;
`;
const StyledAbstract = styled.p`
  ${TokenText};
  font-size: 1.1em;
  line-height: 1.25;
`;
const StyledText = styled.p`
  ${TokenText};
  font-size: 1em;
  line-height: 1.25;
`;
const StyledCitationLink = styled.a`
  color: ${props => (props.selected ? ColorActive : ColorBorder)};
  background: ${props => (props.active ? ColorHighlight : "transparent")};
`;

const parseText = (text, citations, openCitation, highlight) => {
  const split = text.split(/\{\{|\}\}/);

  return (
    <StyledText>
      {split.map((txt, ind, cit) => {
        if (ind % 2 === 0) {
          return <span>{txt}</span>;
        } else {
          const cit = Math.floor(ind / 2);
          return (
            <StyledCitationLink
              href="#"
              onClick={ev => {
                ev.preventDefault();
                openCitation(citations[cit]);
              }}
              onMouseEnter={() => highlight(cit)}
              onMouseLeave={() => highlight(-1)}
              selected={citations[cit].selected}
              active={citations[cit].active}
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
            </StyledCitationLink>
          );
        }
      })}
    </StyledText>
  );
};

const ReadingView = ({ article, openCitation, highlightCitation }) => {
  const art = article.length ? article[0] : null;

  return art ? (
    <div>
      <StyledTitle>{art.title}</StyledTitle>
      <StyledMeta>{art.authors.join(", ")}</StyledMeta>
      <StyledMeta>{art.ref}</StyledMeta>
      <StyledAbstract>{art.abstract}</StyledAbstract>
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
