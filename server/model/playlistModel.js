import mongoose from "mongoose";


const { Schema, model } = mongoose;

const playlistSchema = new Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        playlistName: { type: String, required: true },
        description: { type: String },
        isPublic: { type: Boolean, default: "true" },
        movies: [{ type: String }]
    },
    { timestamps: true }
);



const Playlist = model("Playlist", playlistSchema);

export default Playlist;
