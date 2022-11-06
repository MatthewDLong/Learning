import dynamoose from "dynamoose";
import { Photos } from "./Photos";

if (process.env.NODE_ENV === "development") {
  dynamoose.aws.ddb.local();
}

export default { Photos };
