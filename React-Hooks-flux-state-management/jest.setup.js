import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
global.fetch = require("jest-fetch-mock");
jest.setMock("node-fetch", fetch);

if (!jest.isMockFunction(fetch)) {
  throw new Error("fetch is not mocked.");
}

configure({ adapter: new Adapter() });
