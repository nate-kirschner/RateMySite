import { useEffect, useState } from "react"
import axios from 'axios';
import config from '../config';

import '../styles/post.scss';
import PostPopup from "./PostPopup";

export default function Post() {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("https://");
    const [description, setDescription] = useState("");
    const [hasCommentSection, setHasCommentSection] = useState(true);

    const [postId, setPostId] = useState(null);

    const [popupOpen, setPopupOpen] = useState(false);
    const [wasSubmitClicked, setWasSubmitClicked] = useState(false);
    
    const makePost = () => {
        if (title !== "" || url !== "" || url !== "https://") { // TODO or iframe not rendered
            const body = {
                title, description, url, hasCommentSection
            }
            axios.post(config.makePostUrl, body).then(resp => {
                if (resp.data.status === 200) {
                    setPostId(resp.data.postInfo.postId);
                } else {
                    setPostId("Invalid");
                }
            })
        } else {
            setPostId("Invalid");
        }
    }

    useEffect(() => {
        if (popupOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
            if (postId) {
                setTitle("");
                setUrl("https://");
                setDescription("");
                setPostId(null);
                setWasSubmitClicked(false)
            }
        }
    }, [popupOpen])

    const submitClicked = () => {
        if (title !== "" && url !== "" && url !== "https://") {
            setPopupOpen(true);
        } else {
            setWasSubmitClicked(true);
        }
    }

    return (
        <div className={"post mainpage " + (popupOpen && "preventScroll")}>
            <div className="pageDescriptionBlock">
                <p>Here you can post your personal website to show to the community.</p>
                <p>Make sure to give your post a descriptive title and double check that your url is working before submitting.</p>
            </div>
            <div className="infoBlock">
                <div className="titleBlock postBlock">
                    <span className="titleSpan label">Post Title</span>
                    <input type="text"
                        className={(wasSubmitClicked && title === "" && "highlightRed")}
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>

                <div className="urlBlock postBlock">
                    <span className="urlSpan label">Website Url</span>
                    <input type="text" 
                        className={(wasSubmitClicked && (url === "" || url === "https://") && "highlightRed")}
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                    />
                </div>

                <div className="descriptionBlock postBlock">
                    <span className="descSpan label">Description</span>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className="checkBlock postBlock">
                    <input type="checkbox" className="input checkbox"
                        onChange={(e) => setHasCommentSection(!hasCommentSection)}
                        checked={hasCommentSection}
                    />
                    <span className="label checkbox">Has comment section?
                    <span class="tooltip" 
                        data-tooltip=
                        "Not looking for advice on your site? Uncheck this to disable comments and just let your work serve as inspriation for others. Note that leaving this checked opens you up to (potentially critical/negative) comments."
                    >?</span>
                    </span>
                </div>
            </div>

            <iframe className="iframe" src={url} title="title" />

            <button className="submit" onClick={() => submitClicked()}>Submit</button>

            {
                popupOpen && 
                    <PostPopup title={title} description={description} url={url} hasCommentSection={hasCommentSection} id={postId} setPopupOpen={setPopupOpen} makePost={makePost} />
            }
        </div>
    )
}