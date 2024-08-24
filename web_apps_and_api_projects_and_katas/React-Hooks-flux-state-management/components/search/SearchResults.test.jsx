import React from "react";
import SearchResults from "./SearchResults";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<SearchResults />).toJSON();
  expect(tree).toMatchSnapshot();
});
