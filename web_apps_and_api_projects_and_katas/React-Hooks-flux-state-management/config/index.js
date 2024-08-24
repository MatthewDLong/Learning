const getSearchEndPoint = () => {
  const host = process.env.SEARCH_HOST;
  let searchEndPointPrefix;

  if (process.env.NODE_ENV) {
    switch (process.env.NODE_ENV) {
      case "dev":
        searchEndPointPrefix = "dev.";
      case "test":
        searchEndPointPrefix = "test.";
      default:
        searchEndPointPrefix = "";
    }
  }

  return `https://www.${searchEndPointPrefix}${host}/`;
};

export { getSearchEndPoint };
