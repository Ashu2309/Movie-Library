import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'
import SearchPage from '../components/SearchPage';
import SideBar from '../components/SideBar';

const DashboardPage = () => {



    return (
        <>
            <SideBar />
            <Box w="100" h={'100'}>
                <Grid>
                    <SearchPage />
                </Grid>
            </Box>
        </>
    )
}

export default DashboardPage