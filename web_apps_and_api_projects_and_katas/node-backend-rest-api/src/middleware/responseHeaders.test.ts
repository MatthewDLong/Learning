import { responseHeaders } from "./responseHeaders";

describe("responseHeaders middleware", () => {
  it("should set Cache-Control response header", () => {
    const req = {};
    const res = { set: jest.fn() };
    const next = jest.fn();

    responseHeaders(req, res, next);

    expect(res.set).toHaveBeenCalledWith(
      "Cache-Control",
      "public, max-age=3600, must-revalidate"
    );
  });

  it("should invoke next()", () => {
    const req = {};
    const res = { set: jest.fn() };
    const next = jest.fn();

    responseHeaders(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
