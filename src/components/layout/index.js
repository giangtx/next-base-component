import React, {useState, useEffect} from "react";
import Header from "./header";
import Footer from "./footer";
import { ROUTER } from "../../utils/constants";
import { useRouter } from 'next/router';
import Sidebar from "./sidebar";
import { getLanguage, getTheme } from "../../utils/local-store";
import Modals from "../modal";

import { useDispatch } from "react-redux";
import { showModal } from "../../store/modal/modal.action";
import Toasts from "../common/toast/toasts";

const Layout = ({ children }) => {


    return(
        // Ví dụ về cách sử dụng biến css trong trường hợp thay đổi font-family theo ngôn ngữ
        // có thể áp dụng cách này cho trường hợp muốn làm chức năng theme dark/light
        // theme dark/light color: --primary, --secondary, --tertiary, --white, --black
        <div 
            className="page bg-white dark:bg-black text-black dark:text-white"
        >
            <Header />
            {children}
            <Footer />
            <Modals/>
            <Toasts />
        </div>
    )
}
export default Layout;