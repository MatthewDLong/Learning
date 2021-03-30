import React from "react";
import SearchBoxHeading from "./SearchBoxHeading";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<SearchBoxHeading />).toJSON();
  expect(tree).toMatchSnapshot();
});
