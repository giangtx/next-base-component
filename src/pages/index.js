import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { ROUTER } from "../utils/constants";
import { BASE_URL } from "@utils/apiUtils";
import { formatDate } from "@utils/format";
import { useRouter } from 'next/router';
import { getBlogNewest, getBlogPopular} from "../services/home";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("@components/common/slider"), { ssr: false });
const Scroller = dynamic(() => import("@components/common/scroller"), { ssr: false });

const Home = ({ newestProps, popularProps, isCsr }) => {
    

    return (
        <div>
            tesst
        </div>
    )
}

Home.getInitialProps = async ({ req, query }) => {
    if (typeof window != 'undefined') {
        return {
            newestProps: [],
            popularProps: [],
            isCsr: true,
        }
    }
    try {
        const res = await Promise.all([
            fetch(`${BASE_URL}/api/blogs/newest?limit=10`, { cache: 'force-cache' }),
            fetch(`${BASE_URL}/api/blogs/popular?limit=10`, { cache: 'force-cache' })
        ])
        let resData = await Promise.all(res.map(r => r.json()));
        const newest = resData[0].data;
        const popular = resData[1].data;
        return {
            newestProps: newest,
            popularProps: popular,
            isCsr: false,
        }
    } catch (error) {
        return {
            newestProps: [],
            popularProps: [],
            isCsr: true,
        }
    }
}

export default Home;