import { GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "prod"
    : "http://localhost:4000/graphql";
export const useClient = () => {
  const [idToken, setIdtoken] = useState("");

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;

    setIdtoken(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: idToken,
    },
  });
};
