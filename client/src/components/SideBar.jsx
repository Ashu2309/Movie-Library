import { IoIosLogOut } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Avatar, Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from "../context/UserContext";

const SideBar = () => {
    const { userDetails } = useContext(UserContext)
    return (
        <Box height="100vh" className='sidebar'>
            <Link to="/in/profile">
                <Avatar src={userDetails?.pic} className="avatar" />
            </Link>
            <Link to="/in/search">
                <BsSearch />
            </Link>
            <Link to={`/in/explore/${userDetails?.username}`}>
                <AiFillHome />
            </Link>
            <Link to="/">
                <IoIosLogOut onClick={() => localStorage.removeItem("userInfo")} />
            </Link>
        </Box >
    )
}

export default SideBar