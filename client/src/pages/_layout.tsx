import { QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getClient } from '../queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '/src/scss/index.scss';
import Gnb from '../components/gnb';
import { RecoilRoot } from 'recoil';

const Layout: React.FC = () => {
  const queryClient = getClient();
  const { pathname } = useLocation();

  if (pathname === '/') window.location.replace('/products');
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Gnb />
        <Suspense fallback={'loading...'}>
          <Outlet />
        </Suspense>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
