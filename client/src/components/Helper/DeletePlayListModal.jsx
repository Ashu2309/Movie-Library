import { MdDeleteSweep } from "react-icons/md";
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { Children, useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { AiOutlinePlus } from 'react-icons/ai'

const DeletePlayListModal = ({ children, elem }) => {
    const { userDetails, deletePlaylist } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState("")
    const [deleteActive, setDeleteActive] = useState(false)


    useEffect(() => {
        if (input === userDetails.username + "/" + elem.playlistName) setDeleteActive(true)
        else setDeleteActive(false)
    }, [input])


    const deletePlaylistFn = async () => {
        const response = await deletePlaylist(elem._id)
        //console.log(response)
    }
    //console.log(input)
    //console.log(deleteActive)

    return (
        <>
            <Button variant="outline" colorScheme="red" onClick={onOpen} p="1.5rem" mr="1rem"><MdDeleteSweep fontSize="2rem">{children}</MdDeleteSweep></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Box>
                            <FormControl>
                                <FormLabel>For Confirmation write this text, <b>"{userDetails?.username}/{elem.playlistName}"</b></FormLabel>
                                <Input placeholder='Write the above text' value={input.playlistName} onChange={(e) => setInput(e.target.value)} />
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button isDisabled={!deleteActive} colorScheme='red' mr={3} onClick={deletePlaylistFn}>
                            Confirm
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

export default DeletePlayListModal