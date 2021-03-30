import { IService } from "../types";

class BaseService implements IService {
  client;
  constructor(client) {
    this.client = client;
  }
}

export default BaseService;
