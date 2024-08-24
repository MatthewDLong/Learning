import React from "react";
import SearchBoxInput from "./SearchBoxInput";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<SearchBoxInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
