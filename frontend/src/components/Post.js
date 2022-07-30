import { useEffect, useState } from "react"
import config from '../config';
import axios from 'axios';

import '../styles/post.scss';

export default function Post() {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("https://");
    const [description, setDescription] = useState("");
    const [hasCommentSection, setHasCommentSection] = useState(true);
    
    const makePost = () => {
        if (title !== "" || description !== "") { // TODO or iframe not rendered
            const body = {
                title, description, url, hasCommentSection
            }
            axios.post(config.url + "/make-post", body).then(resp => {
                if (resp.data.status === 200) {
                    alert("Success!");
                    setTitle("");
                    setUrl("https://");
                    setDescription("");
                } else {
                    alert("Uh oh! There was an error making this post :(");
                }
            })
        } else {
            alert("Make sure to fill in all required fields!");
        }
    }

    return (
        <div className="post mainpage">
            <div className="infoBlock">
                <div className="titleBlock postBlock">
                    <span className="titleSpan label">Post Title</span>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="urlBlock postBlock">
                    <span className="urlSpan label">Website Url</span>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>

                <div className="descriptionBlock postBlock">
                    <span className="descSpan label">Description</span>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="checkBlock postBlock">
                    <input type="checkbox" className="input checkbox"
                        onChange={(e) => setHasCommentSection(!hasCommentSection)}
                        checked={hasCommentSection}
                    />
                    <span className="label checkbox">Has comment section?</span>
                </div>
            </div>

            <iframe className="iframe" src={url} title="title" />

            <button className="submit" onClick={() => makePost()}>Submit</button>


        </div>
    )
}