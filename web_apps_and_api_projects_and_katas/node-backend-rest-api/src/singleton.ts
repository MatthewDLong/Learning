import MoonPigService from "./services/MoonPigService";

let moonPigServiceInstance: MoonPigService;

const createMoonPigService = (client) => {
  const init = () => new MoonPigService(client);

  return {
    getInstance: () => {
      if (!moonPigServiceInstance) {
        moonPigServiceInstance = init();
      }
      return moonPigServiceInstance;
    },
  };
};

export { createMoonPigService };
