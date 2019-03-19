import { Mongo } from "meteor/mongo";

export const APIMount = new Mongo.Collection("mount");

export const insertIfNeeded = () => {
  const now = APIMount.find({}).fetch();

  if (now.length !== 1) {
    now.forEach(art => {
      APIMount.remove(art._id);
    });
    APIMount.insert({
      citation: false,
      reading: false
    });
  }
};
