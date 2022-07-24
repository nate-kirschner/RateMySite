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

    const query = useQuery();

    // useEffect(() => {
    //     const postId = new URLSearchParams(location.search).get('id')
    //     if (postId && postId != post.id) {
    //         const body = { 
    //             postId,
    //             sort: "id"
    //         }
    //         axios.post(config.url + "/get-posts", body).then(resp => {
    //             console.log("post", resp.data)
    //             if (resp.data.length !== 0) {
    //                 setSelectedPost(resp.data[0]);
    //             }
    //         })
    //     }
    // }, [query])

    useEffect(() => {
        setSearchParams({ id: post.id })
    }, [post])

    useEffect(() => {
        const postId = new URLSearchParams(location.search).get('id');
        let body;
        if (postId && postId != post.id) {
            console.log(postId)
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
                if (gottenPosts.length === 0 && postIndex !== 0) {
                    if (noMorePosts) {
                        setNoMorePosts(false);
                        setPostIndex(0);
                    } else {
                        setNoMorePosts(true);
                        setSearchParams({});
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

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}