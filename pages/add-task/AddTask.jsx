"use client";
import UserContext from "@/context/userContext";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";
import { useContext } from "react";
import Loading from "../about/loading";

const AddTask = () => {
  const context = useContext(UserContext);
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
  });
  const [loading, setLoading] = useState(false)

  const handleAddTask = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const result = await addTask({...task, userId: context?.user?._id});
      toast.success("Your task is added !!", {
        position: "top-center",
      });
      setLoading(false)

      setTask({
        title: "",
        content: "",
        status: "none",
        userId: ""
      });
    } catch (error) {
      toast.error("Task not added !!" + error?.response?.data?.msg, {
        position: "top-center",
      });
      setLoading(false)
      setTask({
        title: "",
        content: "",
        status: "none",
        userId: ""
      });
    }
  };

  const resetTask = () => {
    setTask({
      title: "",
      content: "",
      status: "none",
      userId: ""
    });
  };

  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5">
        <div className="my-9 flex justify-center">
          <Image src={loginSvg} className="w-80" alt="Login Banner Image" />
        </div>
        <h1 className="text-blue-500 text-2xl text-center">
          Add your task here !!
        </h1>

        <form action="#!" onSubmit={handleAddTask}>
          {/* task title  */}
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-base font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>

          {/* task CONENT  */}
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>

          {/* task status */}
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* button  actions */}
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 flex justify-center items-center gap-6">
            {
              loading ? (
                <div className="">
                <Loading />
                  {/* <div className="w-4 h-4 border-2 border-transparent rounded-full border-t-[2px] border-white animate-spin"></div> */}
                </div>
              ) : ""
            }
            <h2 className="">
              Add Task
            </h2>
            </button>
            <button
              type="button"
              onClick={resetTask}
              className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3"
            >
              Clear
            </button>
          </div>
          {/* {JSON.stringify(task)} */}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
