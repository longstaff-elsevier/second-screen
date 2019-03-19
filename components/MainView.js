import React from "react";
import { APIMount } from "../api/Mount.js";
import { withTracker } from "meteor/react-meteor-data";
import CitationView from "./CitationView";
import ReadingView from "./ReadingView";
import ReadingList from "./ReadingList";
import styled, { css } from "styled-components";

const ReadingGrid = css`
  display: grid;
  grid-gap: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const ReadingGridOne = styled.div`
  ${ReadingGrid};
  grid-template-columns: 3fr;
`;
const ReadingGridTwo = styled.div`
  ${ReadingGrid};
  grid-template-columns: 3fr 1fr;
`;
const ReadingGridThree = styled.div`
  ${ReadingGrid};
  grid-template-columns: 3fr 1fr 1fr;
`;

const OverflowHolder = styled.div`
  overflow-y: scroll;
  padding: 1em;
`;

const MainView = ({ mounted }) => {
  const mountedSessions = mounted[0];

  const children = mountedSessions ? (
    <React.Fragment>
      <OverflowHolder>
        <ReadingView />
      </OverflowHolder>

      {mountedSessions.citation ? null : (
        <OverflowHolder>
          <CitationView />
        </OverflowHolder>
      )}
      {mountedSessions.reading ? null : (
        <OverflowHolder>
          <ReadingList />
        </OverflowHolder>
      )}
    </React.Fragment>
  ) : (
    <p>loading</p>
  );

  const Grid = mountedSessions
    ? mountedSessions.citation && mountedSessions.reading
      ? ReadingGridOne
      : mountedSessions.citation || mountedSessions.reading
        ? ReadingGridTwo
        : ReadingGridThree
    : ReadingGridOne;

  return <Grid>{children}</Grid>;
};

const DataMainView = withTracker(({ id }) => {
  return {
    mounted: APIMount.find({}).fetch()
  };
})(MainView);

const mounted = APIMount.find({}).fetch();

export default DataMainView;
