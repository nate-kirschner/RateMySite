import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../styles/comment.scss';
import config from '../config';

export default function Comments({ commentsArr, postId, likes }) {

    const [update, setUpdate] = useState(false);

    const updateComment = (index, commentLikes) => {
        commentsArr[index].likes = commentLikes;
        const body = { likes, comments: commentsArr, postId };
        axios.post(config.url + "/update-post", body);
        setUpdate(!update);
    }

    const individualComment = (comment, index) => {
        return (
            <div className="comment">
                <span className="date">{comment.date}</span>
                <span className="text">{comment.text}</span>
                <div className="commentLikesDiv">
                    <span className="arrow arrow-up" onClick={() => updateComment(index, comment.likes + 1)}/>
                    <span className="likesCount">{comment.likes}</span>
                    <span className="arrow arrow-down" onClick={() => updateComment(index, comment.likes - 1)}/>
                </div>
            </div>
        )
    }

    return (
        <div className="commentBlock">
            {
                commentsArr && commentsArr.map((comment, index) => {
                    return individualComment(comment, index); 
                })
            }
        </div>
    )
}