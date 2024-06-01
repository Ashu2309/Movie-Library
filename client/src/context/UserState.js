import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom"

import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_PORT;


const UserState = (props) => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState()
    const [reload, setReload] = useState(false)


    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem("userInfo")))
    }, [navigate])


    //signup user
    const signUp = async (input) => {
        try {
            const { cpassword, ...postData } = input;
            ////console.log(postData)
            const response = await axios.post("/api/user", postData)
            return response
        } catch (error) {
            //console.log(error)
        }
    }
    const logIn = async (input) => {
        try {
            const response = await axios.post("/api/user/login", input)
            return response
        } catch (error) {
            //console.log(error)
        }
    }

    const fetchPlaylists = async (param) => {
        try {
            const userInfo = localStorage.getItem("userInfo");

            let token;
            if (!userInfo) {
                token = null;
            } else {
                token = JSON.parse(userInfo).token;
            }

            const response = await axios.get(`/api/playlist/${param}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            //console.log(error);
        }
    };

    const createPlaylist = async (input) => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo).token;
            const response = await axios.post(`/api/playlist`, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReload((prev) => !prev)

            return response;
        } catch (error) {
            //console.log(error);
        }
    }

    const updatePlaylist = async (playlistId, input) => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo).token;
            const response = await axios.put(`/api/playlist/${playlistId}`, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReload((prev) => !prev)

            return response;
        } catch (error) {
            //console.log(error);
        }
    }

    const deletePlaylist = async (playlistId) => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo).token;
            const response = await axios.delete(`/api/playlist/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReload((prev) => !prev)

            return response;
        } catch (error) {
            //console.log(error);
        }
    }

    const addMovie = async (playlistId, movieId) => {
        //console.log(playlistId, movieId)
        try {
            const userInfo = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo).token;
            const response = await axios.post(`/api/movie/${playlistId}`, { movieId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReload((prev) => !prev)

            return response;
        } catch (error) {
            //console.log(error);
        }
    }

    const removeMovie = async (playlistId, movieId) => {
        //console.log(playlistId, movieId)
        try {
            const userInfo = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo).token;
            const response = await axios.delete(`/api/movie/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { movieId } // Include movieId in data property
            });
            setReload((prev) => !prev)

            return response;
        } catch (error) {
            //console.log(error);
        }
    }



    return (
        <>
            <UserContext.Provider
                value={{ userDetails, signUp, logIn, fetchPlaylists, addMovie, removeMovie, createPlaylist, updatePlaylist, reload, setReload, deletePlaylist }}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}

export default UserState