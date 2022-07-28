import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import config from '../config';
import PostSnippet from "./PostSnippet";
import NoPostsPage from "./NoPostsPage";

import { useSearchParams, useLocation } from 'react-router-dom';

import '../styles/browse.scss';

export default function Browse({ selectedPost, setSelectedPost, sort }) {

    const [post, setPost] = useState([]);
    const [postIndex, setPostIndex] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();


    useEffect(() => {
        setSearchParams({ id: post.id })
    }, [post])

    useEffect(() => {
        const postId = new URLSearchParams(location.search).get('id');
        let body;
        if (postId && postId != post.id) {
            body = { 
                postId,
                sort: "id"
            }
        } else {
            body = {
                startIdx: postIndex,
                endIdx: postIndex + 1,
                sort: sort
            }
        }
        
        if (postIndex >= 0) {
            axios.post(config.url + "/get-posts", body).then(resp => {
                const gottenPosts = resp.data;
                if (gottenPosts.length === 0) {
                    setSearchParams({});
                    if (noMorePosts) {
                        if (postIndex !== 0) {
                            setPostIndex(0);
                            setNoMorePosts(false);
                        }
                    } else {
                        setNoMorePosts(true);
                    }
                } else {
                    setNoMorePosts(false);
                    setPost(resp.data[0]);
                }
            })
        } else {
            setNoMorePosts(false);
            setPostIndex(0);
        }
    }, [postIndex, sort])

    useEffect(() => {
        if (selectedPost !== null) {
            setPost(selectedPost);
            setSelectedPost(null);
        }
    }, [selectedPost])

    return (
        <div className="browse mainpage">
            {
                noMorePosts ? 
                <NoPostsPage postIndex={postIndex} setPostIndex={setPostIndex} />
                :
                <PostSnippet {...post} postIndex={postIndex} setPostIndex={setPostIndex} />
            }
        </div>
    )
}