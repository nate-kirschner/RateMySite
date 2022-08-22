import axios from "axios"
import { useEffect, useState } from "react"
import config from '../config';
import PostSnippet from "./PostSnippet";
import NoPostsPage from "./NoPostsPage";
import Icon from '../images/just-logo.js';

import { useSearchParams, useLocation } from 'react-router-dom';

import '../styles/browse.scss';

export default function Browse({ postList, setPostList, index, setIndex, loading, getPostById, listIndex, setListIndex }) {
    
    const [mounted, setMounted] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();

    const changeListIndex = (newListIndex) => {
        setSearchParams({})
        if (newListIndex < 0) {
            if (index[0] - 5 >= 0) {
                setIndex([index[0] - 5, index[1] - 5]);
            }
            setListIndex(0);
        } else if (newListIndex > postList.length) {
            setIndex([index[0] + 5, index[1] + 5]);
            setListIndex(0);
        } else {
            setListIndex(newListIndex);
        }
    }

    useEffect(() => {
        const postId = new URLSearchParams(location.search).get('id');
        if (!isNaN(parseInt(postId))) {
            getPostById(postId);
        }
    }, [searchParams])

    useEffect(() => {
        setMounted(true);
    }, [location]);

    const displayPostSnippet = () => {
        if (postList.length === 0 || listIndex >= postList.length) {
            return <NoPostsPage />
        } else {
            return <PostSnippet {...postList[listIndex]} />
        }
    }

    const displayLoadingIcon = () => {
        return (
            <div className="loadingPopup">
                <div className="logoBox">
                    <Icon className="loadingLogo" />    
                    <div className="dot one" />
                    <div className="dot two" />
                    <div className="dot three" />
                </div>
            </div>
        )
    }

    return (
        <div className="browse mainpage">
            {
                loading ? (
                    displayLoadingIcon()
                ) :
                (
                    displayPostSnippet()
                )
            }
            <div className={"swipeButtons " + (mounted && "mounted")}>
                <div 
                    className="buttonWrapper" onClick={() => changeListIndex(listIndex - 1)} >
                    <div className={"left button " + (index[0] > 0 || listIndex > 0 ? "hasNext" : "noNext")} />
                </div>
                <div className="buttonWrapper" onClick={() => changeListIndex(listIndex + 1)} >
                    <div className="right button" />
                </div>
            </div>
        </div>
    )
}