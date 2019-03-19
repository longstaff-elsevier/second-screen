import React from "react";
import { css } from "styled-components";

export const ColorHighlight = "rgb(225, 235, 250)";
export const ColorBorder = "rgb(37, 84, 157)";
export const ColorText = "#444444";
export const ColorTitle = "#222222";
export const ColorActive = "#E9711C";

export const TokenTitle = css`
  color: ${ColorTitle};
`;
export const TokenText = css`
  color: ${ColorText};
`;

export const TokenButton = css`
  padding: 0.5em 1em 0.7em;
  border: 1px solid ${ColorBorder};
  color: ${ColorBorder};
  background: white;
`;
export const TokenButtonHolder = css`
  display: grid;
  grid-gap: 0.5em;
`;
