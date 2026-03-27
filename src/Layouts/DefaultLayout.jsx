import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar"; 

export default function DefaultLayout() {
  return (
    <>
      <NavBar />
      <Outlet />  {/* This renders the route element */}
    </>
  );
}