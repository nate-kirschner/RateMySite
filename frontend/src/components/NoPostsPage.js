import { useEffect, useState } from 'react';

import '../styles/noPostsPage.scss';
import '../styles/postSnippet.scss';

export default function NoPostsPage({ postIndex, setPostIndex }) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 50);
    }, []);

    return (
        <div className={"noMorePosts postSnippet " + (loaded && "loaded")}>
            <div className="mainBlock">
                <div className="titleBlock">
                    <h3 className="postTitle">No More Posts...</h3>
                    
                </div>
                <div className="likesBlock">
                    <span
                        className={"arrow arrow-up " }
                    />
                    <h4 className="likesNumber">&nbsp;</h4>
                    <span
                        className={"arrow arrow-down "} 
                    />
                </div>
                <div className="siteBlock thumbnail">
                    <div className={"prev " + (postIndex > 0 ? "hasNext" : "noNext")} onClick={() => setPostIndex(postIndex - 1)} />
                    <div className="iframe">
                        <p>There are no more posts to view at this time. Feel free to make your own!</p>
                    </div>
                    <div className={"next hasNext"} onClick={() => setPostIndex(postIndex + 1)} />
                </div>
                {/* <div className="comments">
                    <h3 className="commentsTitle">Comments</h3>
                    <Comments commentsArr={commentState} postId={id} likes={postLikes} />
                    <div className="commentInputBlock">
                        <textarea className="commentInput" rows={2} placeholder="Add a new comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} onKeyDown={(e) => handleEnterComment(e)}/>
                        <div className="submitComment" onClick={() => submitComment()}>Send</div>
                    </div>
                </div> */}
            </div>
           
        </div>
    )
}