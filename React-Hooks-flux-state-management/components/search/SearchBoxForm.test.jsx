import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SearchBoxForm from "./SearchBoxForm";

describe("SearchBoxForm", () => {
  it("renders correctly", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SearchBoxForm />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
