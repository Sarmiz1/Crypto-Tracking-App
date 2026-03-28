import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Suspense } from "react";
import { PagesFallback } from "../Suspense/PagesFallback";
import Footer from "../Components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<PagesFallback />}>
        <Outlet />  {/* This renders the route element */}
      </Suspense>
      <Footer />
    </>
  );
}