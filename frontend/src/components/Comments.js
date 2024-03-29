import { useState } from 'react';
import axios from 'axios';
import '../styles/comment.scss';
import config from '../config';

export default function Comments({ commentsArr, postId, likes }) {

    const [update, setUpdate] = useState(false);
    const [isGreen, setIsGreen] = useState(false);

    const updateComment = (index, commentLikes, direction) => {
        let newLikes = commentLikes;
        let storedDirection = localStorage.getItem("post:" + postId + ":comment:" + index);

        let body = {};
        if (direction === "up") {
            if (storedDirection === "up") {
                newLikes -= 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, null);
                body = { likes, postId, commentIdToDecrease: commentsArr[index].id };
            } else {
                newLikes += 1;
                localStorage.setItem("post:" + postId + ":comment:" + index, direction);
                body = { likes, postId, commentIdToIncrease: commentsArr[index].id };
            }
        }

        commentsArr[index].likes = newLikes;
        axios.post(config.updatePostUrl, body);
        setUpdate(!update);
    }

    const reportComment = (comment) => {
        const body = {
            text: comment.text,
            postId,
            commentId: comment.id
        }
        setIsGreen(true);

        axios.post(config.reportCommentUrl, body).then(resp => {
            localStorage.setItem("report:post:" + postId + ":comment:" + comment.id, true);
            setUpdate(!update);
            setIsGreen(false);
        })
    }

    const individualComment = (comment, index) => {
        const storageStr = "report:post:" + postId + ":comment:" + comment.id
        if (localStorage.getItem(storageStr)) {
            return null;
        }
        return (
            <div className="comment" key={comment.id}>
                <span className="date">{comment.date}</span>
                <span className="text">{comment.text}</span>
                <div className="commentLikesDiv">
                    <svg
                        viewBox="0 0 32 29.6"
                        className={"heart " + (localStorage.getItem("post:" + postId + ":comment:" + index) === "up" && "selected")}
                        onClick={() => updateComment(index, comment.likes, "up")}
                    >
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                    </svg> 
                    <span className="likesCount">{comment.likes}</span>
                </div>
                <div className="reportButtonBox">
                    <div className="reportButton">
                        <div className={"reportButtonText " + (isGreen && "green")}
                            onClick={() => reportComment(comment, index)}>Report Comment</div>
                    </div>
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