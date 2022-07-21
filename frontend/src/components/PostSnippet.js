import { useEffect, useState, useRef } from "react";
import config from "../config";
import "../styles/postSnippet.scss";
import axios from 'axios';
import Comments from "./Comments";

export default function PostSnippet({ username, id, title, description, url, likes, comments, postIndex, setPostIndex }) {

    const [newCommentText, setNewCommentText] = useState("");
    const [commentState, setCommentState] = useState([]);
    const [postLikes, setPostLikes] = useState(likes);

    useEffect(() => {
        setPostLikes(likes)
    }, [likes])

    useEffect(() => {
        if (comments) {
            setCommentState(JSON.parse(comments));
        }
    }, [comments])

    const submitComment = () => {
        if (newCommentText !== "") {
            const date = new Date();
            const commentObj = {
                text: newCommentText,
                date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
                username,
                likes: 0,
                comments: null
            }
            setCommentState([...commentState, commentObj])

            const body = { likes: postLikes, comments: [...commentState, commentObj], postId: id };
            axios.post(config.url + "/update-post", body);
            setNewCommentText("");
        }
    }

    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        setIframeLoaded(false);
    }, [id])

    const updateVotes = (newLikes) => {
        const body = { likes: newLikes, comments: commentState, postId: id };
        axios.post(config.url + "/update-post", body)
        setPostLikes(newLikes);
    }

    const handleEnterComment = (event) => {
        if (event.key === 'Enter' && newCommentText !== "") {
            submitComment(newCommentText);
        }
    }

    return (
        <div className="postSnippet">
            <div className="mainBlock">
                <div className="titleBlock">
                    <h3 className="postTitle">{title}</h3>
                    <a className="postUrl" href={url} target="_blank" rel="noreferrer noopener">{url}</a>
                </div>
                <div className="likesBlock">
                    <span className="arrow arrow-up" onClick={() => updateVotes(postLikes + 1)}/>
                    <h4 className="likesNumber">{postLikes}</h4>
                    <span className="arrow arrow-down" onClick={() => updateVotes(postLikes - 1)}/>
                </div>
                <div className="siteBlock thumbnail">
                    <div className={"scrollArrow up " + (postIndex > 0 ? "hasNext" : "noNext")} onClick={() => setPostIndex(postIndex - 1)} />
                    <iframe src={url} className={iframeLoaded ? "loaded" : ""} frameBorder="0" title={title} loading="lazy" onLoad={() => setIframeLoaded(true)}></iframe>
                    <div className={"scrollArrow down hasNext"} onClick={() => setPostIndex(postIndex + 1)} />
                </div>
                <div className="comments">
                    <h3 className="commentsTitle">Comments</h3>
                    <Comments commentsArr={commentState} postId={id} likes={postLikes} />
                    <div className="commentInputBlock">
                        <textarea className="commentInput" rows={2} placeholder="Add a new comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} onKeyDown={(e) => handleEnterComment(e)}/>
                        <div className="submitComment" onClick={() => submitComment()}>Send</div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}