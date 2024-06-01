import React from 'react'
import SideBar from './SideBar'
import { Box, Heading } from '@chakra-ui/react'

const ProfilePage = () => {
    return (
        <>
            <SideBar />
            <Box color="#fff" className='main-container' padding={{ base: "2rem 1rem 1rem 5rem", lg: "2rem 1rem 1rem 10rem" }}>
                <Heading>Here I can implement User Profile Page</Heading>
                <ul>
                    <li>User Profile Details</li>
                    <li>User Profile Update</li>
                    <li>User Profile Delete</li>
                </ul>

            </Box >
        </>
    )
}

export default ProfilePage