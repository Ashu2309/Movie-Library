import { FaPencilAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Box, Button, Flex, Grid, Heading, Image, Input, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import PlayListModal from './Helper/PlayListModal';
import { AiOutlinePlus } from 'react-icons/ai';
import UpdatePlayListModal from "./Helper/UpdatePlayListModal";
import DeletePlayListModal from "./Helper/DeletePlayListModal";

const ExplorePage = () => {
    const { username } = useParams();
    const [lists, setLists] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    const { userDetails, fetchPlaylists, removeMovie, reload } = useContext(UserContext);
    //console.log(username);


    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetchPlaylists(username);
            //console.log(response);
            if (response) setLists(response.data.response);
        }
        fetchLists();
    }, [reload]);

    const handleDetails = (playlistKey, movieKey) => {
        setHoveredItem(`${playlistKey}-${movieKey}`);
    };

    const clearHover = () => {
        setHoveredItem(null);
    };

    const removeFromPlaylist = async (playlist, elem) => {
        const response = await removeMovie(playlist._id, elem.imdbID);
        //console.log(response)
    }

    //console.log(lists);
    return (
        <>
            <SideBar />
            <Box className='main-container' padding={{ base: "2rem 1rem 1rem 5rem", lg: "2rem 1rem 1rem 10rem" }}>
                <Box>
                    <Heading color="#90daff">PLAYLISTS</Heading>
                    <hr style={{ margin: "1rem 0" }} />
                </Box>
                <Box mt="3">
                    {lists.map((elem, playlistKey) => (
                        <Box key={playlistKey} color="#fff" my={4}>
                            <Flex justifyContent="space-between">
                                <Flex alignContent="center">
                                    <Heading textTransform="capitalize" mr="5">{elem.playlistName}</Heading>
                                    {!elem.isPublic ? <Button variant="outline" colorScheme="red">Private</Button> :
                                        <Button variant="outline" colorScheme="blue">Public</Button>}
                                </Flex>
                                {userDetails &&
                                    <Flex alignContent="center">
                                        <DeletePlayListModal elem={elem}></DeletePlayListModal>
                                        <UpdatePlayListModal elem={elem}></UpdatePlayListModal>
                                    </Flex>
                                }

                            </Flex>
                            <Text fontSize="2xl" color="#90daff">{elem.description}</Text>
                            <Grid gridTemplateColumns={{ lg: "repeat(6,1fr)", md: "repeat(4,1fr)", base: "repeat(2,1fr)" }} gap="1.5" mt="2rem">
                                {elem.movies.map((movie, movieKey) => (
                                    <Box position="relative" key={`${playlistKey}-${movieKey}`}>
                                        {hoveredItem === `${playlistKey}-${movieKey}` ? (
                                            <Box
                                                className="active_card"
                                                cursor="pointer"
                                                onMouseEnter={() => handleDetails(playlistKey, movieKey)}
                                                onMouseLeave={clearHover}
                                            >
                                                <figure>
                                                    <Image src={movie?.Poster} height="100%" width="100%" />
                                                </figure>
                                                <Box position="absolute" bottom="0%" padding="1rem" opacity="0.6" background="linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" width="100%" height="80%">
                                                </Box>
                                                <Box position="absolute" bottom="0%" padding="1rem" zIndex="1000">
                                                    <Flex justifyContent="space-between">
                                                        <Heading fontSize="2xl" w="80%">{movie.Title}</Heading>
                                                        <Button ml={2} fontSize="4xl" variant="solid" onClick={() => removeFromPlaylist(elem, movie)}><CgClose /></Button>
                                                    </Flex>
                                                    <Flex justifyContent="space-between"><Text>{movie.Type}</Text><Text>{movie.Year}</Text></Flex>
                                                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque provident ipsum nihil et quos reprehenderit consequatur, numquam sint laudantium impedit.</Text>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                className={`movie_item`}
                                                cursor="pointer"
                                                onMouseEnter={() => handleDetails(playlistKey, movieKey)}
                                                onMouseLeave={clearHover}
                                            >
                                                <figure>
                                                    <Image src={movie?.Poster} height={{ lg: "280px" }} width={{ lg: "100%" }} />
                                                </figure>
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </Grid>
                            {lists.length - 1 !== playlistKey &&
                                <hr style={{ margin: "1rem 0" }} />

                            }

                        </Box>

                    ))}
                </Box>
            </Box >
        </>
    )
}

export default ExplorePage;
