import React from "react";
import SearchBoxLabel from "./SearchBoxLabel";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<SearchBoxLabel />).toJSON();
  expect(tree).toMatchSnapshot();
});
