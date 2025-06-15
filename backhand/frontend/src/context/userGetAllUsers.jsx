import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
  const getUsers = async () => {
    setLoading(true);
 

  try {
    const token = Cookies.get("jwt");


     const response = await axios.get("/api/user/getUserProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
 });
    setAllUsers(response.data.filterUsers);
    setLoading(false)

  } catch (error) {
    console.log("Error in usergrtusers" + error);
  }
   };
   getUsers()
}, []);


  return [allUsers,loading];
}

export default useGetAllUsers;
