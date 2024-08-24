import { validateCardId, validateSizeId } from "./validation";
import { ErrorResponse } from "../types";

describe("middleware validation", () => {
  describe("validateCardId", () => {
    it("should call next() when no cardId is given", () => {
      const req = { params: {} };
      const res = {};
      const next = jest.fn();

      validateCardId(req, res, next);

      expect(next).toBeCalled();
    });

    it("should return a 400 status when an invalid cardId is given", () => {
      const req = {
        params: {
          cardId: "invalid123",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateCardId(req, res, next);

      expect(res.status).toBeCalledWith(400);
    });

    it("should return a descriptive error message when an invalid cardId is given", () => {
      const req = {
        params: {
          cardId: "invalid123",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateCardId(req, res, next);

      const expectedErrorMessage: ErrorResponse = {
        errorMessage: "Invalid cardId supplied: invalid123",
      };

      expect(res.send).toBeCalledWith(expectedErrorMessage);
    });

    it("should call next() when a valid cardId is given", () => {
      const req = {
        params: {
          cardId: "card123",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateCardId(req, res, next);

      expect(next).toBeCalled();
    });
  });
  describe("validate sizeId", () => {
    it("should return a 400 status when an invalid sizeId is given", () => {
      const req = {
        params: {
          sizeId: "invalid",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateSizeId(req, res, next);

      expect(res.status).toBeCalledWith(400);
    });

    it("should return a descriptive error message when an invalid sizeId is given", () => {
      const req = {
        params: {
          sizeId: "invalid",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateSizeId(req, res, next);

      const expectedErrorMessage: ErrorResponse = {
        errorMessage: "Invalid sizeId supplied: invalid",
      };

      expect(res.send).toBeCalledWith(expectedErrorMessage);
    });

    it("should call next() when a valid sizeId is given", () => {
      const req = {
        params: {
          sizeId: "gt",
        },
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateSizeId(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should call next() when no sizeId is given", () => {
      const req = {
        params: {},
      };

      const res = {
        status: jest.fn(() => {
          return res;
        }),
        send: jest.fn(() => {
          return res;
        }),
      };

      const next = jest.fn();

      validateSizeId(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
