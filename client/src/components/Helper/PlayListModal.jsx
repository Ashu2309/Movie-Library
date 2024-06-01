import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { Children, useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { AiOutlinePlus } from 'react-icons/ai'

const PlayListModal = ({ children, elem }) => {
    const { userDetails, fetchPlaylists, addMovie, createPlaylist } = useContext(UserContext)
    const [lists, setLists] = useState([])
    const [displayBlock, setDisplayBlock] = useState(false)
    const [input, setInput] = useState({
        playlistName: "",
        description: "",
        isPublic: true
    })



    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetchPlaylists(null);
            if (response) setLists(response.data.response)
        }
        fetchLists();
    }, [])

    const createNewPlaylist = async () => {
        const response = await createPlaylist(input);
        //console.log(response)
        onClose()
    }

    const addMovieToPlaylist = async (playlist) => {
        const response = await addMovie(playlist._id, elem.imdbID);
    }

    //console.log(input)

    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add to Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            {lists?.map((elem, key) => (
                                <Flex justifyContent="space-between" w="100%">
                                    <Text fontSize="2xl">{elem?.playlistName}</Text><Button onClick={() => addMovieToPlaylist(elem)}><AiOutlinePlus /></Button>
                                </Flex>
                            ))}
                        </VStack>
                        <Button variant="outline" colorScheme='green' onClick={() => setDisplayBlock(true)}>Create New Playlist</Button>
                        {displayBlock && (
                            <Box>
                                <FormControl>
                                    <FormLabel>Playlist Name</FormLabel>
                                    <Input placeholder='Playlist Name' value={input.playlistName} onChange={(e) => setInput({ ...input, playlistName: e.target.value })} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Playlist Description</FormLabel>
                                    <Input placeholder='Playlist Description' value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel></FormLabel>
                                    <Checkbox isChecked={input.isPublic} onChange={(e) => setInput({ ...input, isPublic: e.target.checked })}>Public</Checkbox>
                                </FormControl>
                                <Flex>
                                    <Button colorScheme='blue' mr={3} onClick={createNewPlaylist}>
                                        Save
                                    </Button>
                                    <Button onClick={() => setDisplayBlock(false)}>Cancel</Button>
                                </Flex>
                            </Box>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default PlayListModal