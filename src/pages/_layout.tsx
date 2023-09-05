import { QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { getClient } from "../queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "/src/scss/index.scss";

const Layout: React.FC = () => {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={"loading..."}>
        <Outlet />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
