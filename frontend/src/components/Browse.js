import axios from "axios"
import { useEffect, useState } from "react"
import config from '../config';
import PostSnippet from "./PostSnippet";
import NoPostsPage from "./NoPostsPage";

import { useSearchParams, useLocation } from 'react-router-dom';

import '../styles/browse.scss';

export default function Browse({ postList, setPostList, index, setIndex }) {
    
    const [mounted, setMounted] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();

    const [listIndex, setListIndex] = useState(0);

    const changeListIndex = (newListIndex) => {
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
        if (postId !== null) {
            if (!postList[listIndex] || postId != postList[listIndex].id) {
                const body = {
                    postId,
                    sort: "id"
                }
                axios.post(config.getPostUrl, body).then(resp => {
                    if (resp.data.length !== 0) {
                        setPostList([resp.data[0]]);
                    } else {
                        setPostList([]);
                    }
                })
            }
        }
    }, [searchParams])

    useEffect(() => {
        if (postList[listIndex]) {
            setSearchParams({ id: postList[listIndex].id });
        } else {
            setSearchParams({});
        }
    }, [listIndex])

    useEffect(() => {
        setListIndex(0);
    }, [postList])

    useEffect(() => {
        setMounted(true);
    }, [location]);

    return (
        <div className="browse mainpage">
            {
                postList.length === 0 || listIndex >= postList.length ? 
                <NoPostsPage />
                :
                <PostSnippet {...postList[listIndex]} />
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