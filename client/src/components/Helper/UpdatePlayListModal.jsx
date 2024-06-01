import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaPencilAlt } from 'react-icons/fa'

const UpdatePlayListModal = ({ children, elem }) => {
    const { userDetails, fetchPlaylists, updatePlaylist } = useContext(UserContext)
    const [lists, setLists] = useState([])
    const [input, setInput] = useState({
        playlistName: elem.playlistName || "",
        description: elem.description || "",
        isPublic: elem.isPublic,
    })



    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetchPlaylists(null);
            //console.log(response)
            if (response) setLists(response.data.response)
        }
        fetchLists();
    }, [])

    const updatePlaylistFn = async () => {
        const response = await updatePlaylist(elem._id, input);
        onClose()
    }

    //console.log(input)

    return (
        <>
            <Button variant="solid" colorScheme="green" onClick={onOpen} p="1.5rem"><FaPencilAlt fontSize="2rem" >{children}</FaPencilAlt></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

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
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={updatePlaylistFn}>
                            Save
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default UpdatePlayListModal