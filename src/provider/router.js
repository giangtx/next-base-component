import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect } from 'react';
import { useModal } from '@hooks/modal';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {

    const {
        hide
    } = useModal();
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', NProgress.start)
        router.events.on('routeChangeComplete', NProgress.done)
        router.events.on('routeChangeError', NProgress.done)
        return () => {
            router.events.off('routeChangeStart', NProgress.start)
            router.events.off('routeChangeComplete', NProgress.done)
            router.events.off('routeChangeError', NProgress.done)
        }
      }, [])
    return (
        <RouterContext.Provider value={router}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouterContext = () => useContext(RouterContext);