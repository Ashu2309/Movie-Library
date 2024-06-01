import asyncHandler from "express-async-handler";
import Playlist from "../model/playlistModel.js";

export const addMovie = asyncHandler(async (req, res) => {
    try {
        const { movieId } = req.body;
        const playlistId = req.params.playlistId;

        // Find the playlist by ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).send({ message: "Playlist not found" });
        }

        // Check if the movie already exists in the playlist
        if (playlist.movies.includes(movieId)) {
            return res.status(400).send({ message: "Movie already exists in the playlist" });
        }

        // If movie doesn't exist, add it to the playlist
        playlist.movies.push(movieId);
        await playlist.save();

        res.status(200).send({ message: "Movie Added Successfully", response: playlist });
    } catch (error) {
        res.status(400).send({ message: "Failed to add Movie", error });
    }
});

export const removeMovie = asyncHandler(async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const { movieId } = req.body;

        const playlistMovie = await Playlist.findByIdAndUpdate(
            playlistId,
            { $pull: { movies: movieId } }, // Pull the movieId from the 'movies' array
            { new: true } // Return the updated document
        );

        if (!playlistMovie) {
            return res.status(404).send({ message: "Playlist not found" });
        }

        res.status(200).send({ message: "Movie Removed Successfully", response: playlistMovie });
    } catch (error) {
        res.status(400).send({ message: "Failed to remove Movie", error });
    }
});
