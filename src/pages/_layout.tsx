import { QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { getClient } from "../queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "/src/scss/index.scss";
import Gnb from "../components/gnb";
import { worker } from "../mocks/browser";
import { RecoilRoot } from "recoil";

if (import.meta.env.DEV) {
  worker.start();
}

const Layout: React.FC = () => {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Gnb />
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
