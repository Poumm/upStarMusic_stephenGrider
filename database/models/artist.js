const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = require("./album");

const ArtistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: String,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
});

const artist = mongoose.model("artist", ArtistSchema);

module.exports = artist;
