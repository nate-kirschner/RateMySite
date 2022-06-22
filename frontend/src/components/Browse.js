import axios from "axios"
import { useEffect, useState } from "react"
import config from '../config';
import PostSnippet from "./PostSnippet";

import '../styles/browse.scss';

export default function Browse({ selectedPost, setSelectedPost, sort }) {

    const [post, setPost] = useState([]);
    const [postIndex, setPostIndex] = useState(0);

    useEffect(() => {
        const body = {
            startIdx: postIndex,
            endIdx: postIndex + 1,
            sort: sort
        }
        if (postIndex >= 0) {
            axios.post(config.url + "/get-posts", body).then(resp => {
                const gottenPosts = resp.data;
                if (gottenPosts.length === 0 && postIndex !== 0) {
                    setPostIndex(0);
                } else {
                    setPost(resp.data[0]);
                }
            })
        } else {
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
            <PostSnippet {...post} postIndex={postIndex} setPostIndex={setPostIndex} />
        </div>
    )
}