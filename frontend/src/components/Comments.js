import { useState } from 'react';
import axios from 'axios';
import '../styles/comment.scss';
import config from '../config';

export default function Comments({ commentsArr, postId, likes }) {

    console.log(commentsArr)

    const [update, setUpdate] = useState(false);

    const updateComment = (index, commentLikes, direction) => {
        let newLikes = commentLikes;
        let storedDirection = localStorage.getItem("post:" + postId + ":comment:" + index);

        if (direction === "down") {
            if (storedDirection === "down") {
                newLikes += 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, null);
            } else if (storedDirection === "up") {
                newLikes -= 2;
                localStorage.setItem("post:" + postId + ":comment:" + index, direction);
            } else {
                newLikes -= 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, direction);
            }
        } else if (direction === "up") {
            if (storedDirection === "up") {
                newLikes -= 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, null);
            } else if (storedDirection === "down") {
                newLikes += 2;
                localStorage.setItem("post:" + postId + ":comment:" + index, direction);
            } else {
                newLikes += 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, direction);
            }
        }

        commentsArr[index].likes = newLikes;
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
                    <span 
                        className={"arrow arrow-up " + (localStorage.getItem("post:" + postId + ":comment:" + index) === "up" && "selected")} 
                        onClick={() => updateComment(index, comment.likes, "up")}
                    />
                    <span className="likesCount">{comment.likes}</span>
                    <span 
                        className={"arrow arrow-down " + (localStorage.getItem("post:" + postId + ":comment:" + index) === "down" && "selected")} 
                        onClick={() => updateComment(index, comment.likes, "down")}
                    />
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