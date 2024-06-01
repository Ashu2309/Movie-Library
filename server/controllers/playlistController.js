import asyncHandler from "express-async-handler";
import Playlist from "../model/playlistModel.js";
import User from "../model/userModel.js";
import axios from "axios"

export const createPlaylist = asyncHandler(async (req, res) => {
    try {
        const body = { ...req.body, "user_id": req.user._id };
        const response = await Playlist.create(body);
        res.send({ "message": "Playlist Created Successfully", "response": response }).status(200)
    } catch (error) {
        res.send({ "message": "Failed to create playlist", "error": error }).status(400)
    }
})

export const updatePlaylist = asyncHandler(async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const updates = req.body;

        const response = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!response) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ message: "Playlist Updated Successfully", response });
    } catch (error) {
        res.status(400).json({ message: "Failed to update playlist", error });
    }
});


export const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        const playlistId = req.params.playlistId;

        const response = await Playlist.findByIdAndDelete(playlistId);

        if (!response) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ message: "Playlist Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete playlist", error });
    }
});

export const getPlaylist = asyncHandler(async (req, res) => {
    try {
        const username = req.params.username;
        const userData = await User.findOne({ username: username });
        let userId;
        const isLoggedIn = req.isLoggedIn;

        if (isLoggedIn) {
            userId = req.userId;
            const playlists = await Playlist.find({ user_id: userId });
            const populatedPlaylists = await Promise.all(playlists.map(async (playlist) => {
                const movies = await Promise.all(playlist.movies.map(async (movieId) => {
                    const response = await axios.get(`https://www.omdbapi.com/?apikey=43ae803&i=${movieId}`);
                    return response.data;
                }));
                return { ...playlist.toObject(), movies };
            }));
            res.status(200).json({ message: "Playlist Fetched Successfully", response: populatedPlaylists });
        } else {
            userId = userData._id;
            const playlists = await Playlist.find({ user_id: userId, isPublic: true });
            const populatedPlaylists = await Promise.all(playlists.map(async (playlist) => {
                const movies = await Promise.all(playlist.movies.map(async (movieId) => {
                    const response = await axios.get(`https://www.omdbapi.com/?apikey=43ae803&i=${movieId}`);
                    return response.data;
                }));
                return { ...playlist.toObject(), movies };
            }));
            res.status(200).json({ message: "Playlist Fetched Successfully", response: populatedPlaylists });
        }

    } catch (error) {
        res.status(400).json({ message: "Failed to fetch playlist", error });
    }
});
