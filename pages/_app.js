import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CustomNavbar from "@/components/CustomNavbar";
import UserProvider from "@/context/userProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar />
          <Component {...pageProps} />
        </UserProvider>
    </>
  );
}
