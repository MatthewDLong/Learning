import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders correctly", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SearchBox />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
