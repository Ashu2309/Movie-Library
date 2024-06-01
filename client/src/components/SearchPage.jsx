import { AiOutlinePlus } from "react-icons/ai";
import { Box, Button, Flex, Grid, Heading, Image, Input, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import axios from 'axios';
import PlayListModal from "./Helper/PlayListModal";
import UserContext from "../context/UserContext";

const SearchPage = () => {

    const { userDetails } = useContext(UserContext)

    const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
    const [input, setInput] = useState({
        title: ""
    })
    const [result, setResult] = useState([])
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleInput = (e) => {
        setInput((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const searchMovies = async () => {
        const response = await axios.get(`${url}&s=${input.title}`);
        //console.log(response)
        setResult(response.data.Search)
    }

    useEffect(() => {
        let timeout = setTimeout(() => {
            searchMovies();
        }, 3000);
        return () => clearTimeout(timeout)
    }, [input])


    const handleDetails = (key) => {
        setHoveredItem(key);
    };


    return (
        <>
            <SideBar />
            <Box className='main-container' padding={{ base: "2rem 1rem 1rem 5rem", lg: "2rem 1rem 1rem 10rem" }}>
                <Box>
                    <Input placeholder='Search Movies, series, episodes' size='lg' name="title" value={input.title} onChange={(e) => handleInput(e)} />
                </Box>
                {input.title === "" &&
                    <Box h="calc(100vh - 10rem)" w="100%" color="#fff" display="flex" alignItems="center" justifyContent="center">
                        <Heading> Search to Browse Movies !</Heading>
                    </Box>
                }
                <Grid gridTemplateColumns={{ lg: "repeat(6,1fr)", md: "repeat(4,1fr)", base: "repeat(2,1fr)" }} gap="1.5" mt="2rem">
                    {result?.map((elem, key) => (
                        <>
                            <Box position="relative">
                                {hoveredItem === key ?
                                    <Box
                                        key={key}
                                        className="active_card"
                                        cursor="pointer"
                                        onMouseEnter={() => handleDetails(key)}
                                        onMouseLeave={() => setHoveredItem(null)}

                                    >
                                        <figure>
                                            <Image src={elem?.Poster} height="100%" width="100%" />
                                        </figure>
                                        <Box position="absolute" bottom="0%" padding="1rem" opacity="0.6" background="linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" width="100%" height="80%">
                                        </Box>
                                        <Box position="absolute" bottom="0%" padding="1rem" zIndex="1000">
                                            <Flex justifyContent="space-between">
                                                <Heading fontSize="2xl" w="80%">{elem.Title}</Heading>
                                                {userDetails &&
                                                    <PlayListModal elem={elem}><Button ml={2} fontSize="4xl" variant="solid" ><AiOutlinePlus /></Button></PlayListModal>
                                                }

                                            </Flex>
                                            <Flex justifyContent="space-between"><Text>{elem.Type}</Text><Text>{elem.Year}</Text></Flex>
                                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque provident ipsum nihil et quos reprehenderit consequatur, numquam sint laudantium impedit.</Text>
                                        </Box>
                                    </Box>
                                    :
                                    <Box
                                        key={key}
                                        className={`movie_item`}
                                        cursor="pointer"
                                        onMouseEnter={() => handleDetails(key)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <figure>
                                            <Image src={elem?.Poster} height={{ lg: "280px" }} width={{ lg: "100%" }} />
                                        </figure>
                                    </Box>
                                }
                            </Box >
                        </>
                    ))}

                </Grid >
            </Box >
        </>
    )
}

export default SearchPage