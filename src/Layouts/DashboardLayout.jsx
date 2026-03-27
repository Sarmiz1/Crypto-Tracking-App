import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { PagesFallback } from "../Suspense/PagesFallback";
import TopAppBar from "../Components/TopAppBar";

export default function DashboardLayout({
  mode,
  setMode,
  setMobileOpen,
  isMobile
}) {
  return (
    <>
      <TopAppBar
        mode={mode}
        setMode={setMode}
        isMobile={isMobile}
        setMobileOpen={setMobileOpen}
      />
      <Suspense fallback={<PagesFallback />}>
        <Outlet />  {/* This renders the route element */}
      </Suspense>
    </>
  );
}