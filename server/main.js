import { Meteor } from "meteor/meteor";

//Mongo APIs
import "../api/ReadingList.js";
import "../api/Selected.js";
import "../api/Citation.js";
import { APIMount, insertIfNeeded } from "../api/Mount.js";

Meteor.startup(() => {
  insertIfNeeded();
});
