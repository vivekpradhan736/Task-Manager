"use client";

import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  async function doLogout() {
    try {
      const result = await logout();
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      toast.error("Logout Error !!" + error.response.data.msg);
    }
  }

  return (
    <nav className="bg-blue-600 sticky top-0 z-50 h-16 py-2 px-36 flex justify-between items-center">
      <div className="overflow-hidden w-24 h-8">
        <h1 className="text-2xl font-semibold hover:text-blue-200">
          <Link href="/">Task.IO</Link>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-5">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/add-task" className="hover:text-blue-200">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href={"/show-tasks"} className="hover:text-blue-200">
                  My Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-5 items-center">
          {context.user && (
            <>
              <li className="flex items-center">
                <Link href={"/profile/user"}>
                  <img
                    src={context?.user?.profileURL}
                    className="w-9 h-9 rounded-full object-fill"
                    alt=""
                  />
                </Link>
                <Link
                  href={"/profile/user"}
                  className="hover:bg-[#c0bebe34] duration-200 py-1 px-2 rounded-sm"
                >
                  {context?.user?.name}
                </Link>
              </li>
              <li>
                <button
                  className="text-[#a33232] font-bold text-lg hover:bg-[#c0bebe34] duration-200 px-2 rounded-sm"
                  onClick={doLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {!context.user && (
            <>
              <li>
                <Link href="/login" className="hover:text-blue-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-blue-200">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
