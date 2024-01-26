import { httpAxios } from "@/helper/httpHelper";
// signup user
export async function signUp(user, profileURL) {
  const result = await httpAxios
    .post("/api/user/register", user, profileURL)
    .then((response) => response.data);
  return result;
}

// login user
export async function login(loginData) {
  const result = await httpAxios
    .post("/api/signin/login", loginData)
    .then((response) => response.data);
  return result;
}

export async function currentUser() {
  const result = await httpAxios
    .get("/api/current/currentUser")
    .then((response) => response.data);
  return result;
}

// logout user
export async function logout() {
  const result = await httpAxios
    .post("/api/logout/logout")
    .then((response) => response.data);
  return result;
}
