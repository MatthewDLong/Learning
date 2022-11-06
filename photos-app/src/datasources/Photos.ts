import dynamoose from "dynamoose";

export const photosSchema = new dynamoose.Schema({
  id: {
    type: String,
  },
  url: {
    type: String,
  },
  title: {
    type: String,
  },
});

export const Photos = dynamoose.model("dev.photos", photosSchema);
