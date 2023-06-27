import { useEffect, useState, useRef } from "react";
import config from "../config";
import "../styles/postSnippet.scss";
import axios from "axios";
import Comments from "./Comments";
import ReCAPTCHA from "react-google-recaptcha";

export default function PostSnippet({
  username,
  id,
  title,
  description,
  url,
  likes,
  comments,
  hasCommentSection,
}) {
  const [newCommentText, setNewCommentText] = useState("");
  const [commentState, setCommentState] = useState([]);
  const [postLikes, setPostLikes] = useState(likes);

  const captchaRef = useRef(null);

  useEffect(() => {
    if (captchaRef.current) {
      captchaRef.current.reset();
    }
  }, []);

  useEffect(() => {
    setPostLikes(likes);
  }, [likes]);

  useEffect(() => {
    if (comments) {
      setCommentState(JSON.parse(comments));
    }
  }, [comments]);

  const submitComment = () => {
    if (newCommentText !== "") {
      const date = new Date();
      const commentObj = {
        text: newCommentText,
        date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
        username,
        likes: 0,
        comments: null,
      };

      const token = captchaRef.current.getValue();
      const body = {
        likes: postLikes,
        comment: commentObj,
        postId: id,
        captchaToken: token,
      };
      axios.post(config.submitCommentUrl, body).then((resp) => {
        if (resp.data.status === 200) {
          setCommentState([...commentState, commentObj]);
        }
      });
      captchaRef.current.reset();
      setNewCommentText("");
    }
  };

  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
    setTimeout(() => setIframeLoaded(true), 50);
  }, [id]);

  const updateVotes = (direction) => {
    let newLikes = postLikes;
    let storedDirection = localStorage.getItem("post:" + id);
    if (direction === "up") {
      if (storedDirection === "up") {
        newLikes -= 1;
        localStorage.setItem("post:" + id, null);
      } else if (storedDirection === "down") {
        newLikes += 2;
        localStorage.setItem("post:" + id, direction);
      } else {
        newLikes += 1;
        localStorage.setItem("post:" + id, direction);
      }
    }
    const body = {
      likes: newLikes,
      comments: commentState,
      postId: id,
    };
    axios.post(config.updatePostUrl, body);
    setPostLikes(newLikes);
  };

  const handleEnterComment = (event) => {
    if (event.key === "Enter" && newCommentText !== "") {
      submitComment(newCommentText);
    }
  };

  return (
    <div className={"postSnippet " + (iframeLoaded ? "loaded" : "")}>
      <div className="mainBlock">
        <div className="titleBlock">
          <div className="titleTooltipBlock">
            <h3 className="postTitle">{title}</h3>
            {description != "" && (
              <span className="tooltip" data-tooltip={description}>
                ?
              </span>
            )}
            <div className="shareIcon">
              <div className="shareIconBorder">
                <div className="shareIconContent">
                  Share this post with the following link:
                  <br />
                  <a href={"https://ratemysite.xyz/#/browse?id=" + id}>
                    https://ratemysite.xyz/#/browse?id={id}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            className="postUrl"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {url}
          </a>
        </div>
        <div className="likesBlock" onClick={() => updateVotes("up")}>
          <svg
            viewBox="0 0 32 29.6"
            className={
              "heart " +
              (localStorage.getItem("post:" + id) === "up" && "selected")
            }
          >
            <path
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            />
          </svg>
          <h4 className="likesNumber">{postLikes}</h4>
        </div>
        <div className="siteBlock thumbnail">
          <iframe
            src={url}
            frameBorder="0"
            title={title}
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        </div>
        {hasCommentSection && (
          <div className="comments">
            <h3 className="commentsTitle">Comments</h3>
            <Comments
              commentsArr={commentState}
              postId={id}
              likes={postLikes}
            />

            <div className="commentInputBlock">
              <div className="captchaDiv">
                <ReCAPTCHA
                  className="recaptcha"
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  ref={captchaRef}
                />
              </div>
              <textarea
                className="commentInput"
                rows={2}
                placeholder="Add a new comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => handleEnterComment(e)}
              />
              <div className="submitComment" onClick={() => submitComment()}>
                Send
              </div>
            </div>
            <div className="pageDescriptionBlock error">
              <p>
                New comments are currently unavailabled while our servers are
                down :(
              </p>
              <p>Sorry for the inconvenience.</p>
            </div>
          </div>
        )}
        <div className="pageButtons"></div>
      </div>
    </div>
  );
}
