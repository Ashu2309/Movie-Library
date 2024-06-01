import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieSchema = new Schema(
    {
        Poster: { type: String },
        Title: { type: String },
        Type: { type: String },
        Year: { type: String },
        imdbID: { type: String }
    },
    { timestamps: true }
);



const Movie = model("Movie", movieSchema);

export default Movie;
