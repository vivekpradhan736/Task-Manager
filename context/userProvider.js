"use client";
import React from 'react'
import UserContext from "./userContext";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { currentUser } from '@/services/userService';

const userProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        async function load() {
          try {
            const tempUser = await currentUser();
            setUser({ ...tempUser.user });
          } catch (error) {
            toast.info("Please login first");
            setUser(undefined);
          }
        }
        load();
      }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default userProvider
