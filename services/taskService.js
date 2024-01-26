import { httpAxios } from "@/helper/httpHelper";

// Add Task
export async function addTask(task) {
  const result = await httpAxios
    .post("/api/tasks/createtask", task)
    .then((response) => response.data);
  return result;
}

// Get All Tasks of login user
export async function getTasksOfUser(userId) {
  const result = await httpAxios
    .get(`/api/user/${userId}/tasks/userTask`)
    .then((response) => response.data);
  return result;
}

// Delete Task
export async function deleteTask(taskId) {
  const result = await httpAxios
    .delete(`/api/tasks/${taskId}/deleteTask`)
    .then((response) => response.data);
  return result;
}
