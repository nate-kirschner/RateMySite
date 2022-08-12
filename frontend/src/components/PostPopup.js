import { useEffect, useState } from 'react'
import '../styles/postPopup.scss'

export default function PostPopup({title, description, url, hasCommentSection, id, setPopupOpen, makePost}) {

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(true);
    const [showFinalizedPopup, setShowFinalizedPopup] = useState(false);

    const [transition, setTransition] = useState(false);

    useEffect(() => {
            setTransition(true);
    }, [])

    const confirmationPopup = () => {
        return (
            <div className="confirmationPopup">
                <h3>Ready to submit?</h3>
                <p>Make sure to double check your submission.</p>
                <p>Once confirmed, posts can't be edited or deleted.</p>
                
                <div className="exampleSubmission">
                    <p className="title">{title}</p>
                    <p className="description">{description}</p>
                    <a className="url" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    <p>{hasCommentSection ? "Include comment section" : "Exclude comment section"}</p>
                </div>

                <div className="buttons">
                    <button className="submitButton" onClick={() => makePost()}>Submit</button>
                    <button className="cancelButton" onClick={() => setPopupOpen(false)}>Keep Editing</button>
                </div>
            </div>
        )
    }

    const finalizedPopup = () => {
        return (
            <div className="finalizedPopup">
                {
                    id !== "Invalid" ?
                    <>
                        <h3>Success!</h3>

                        <p>Your post has been submitted and is pending approval. 
                            It won't be available on the Browse page yet or by Search, 
                            but you can view and share it with the following link:
                        </p>

                        <a href={"https://ratemysite.xyz/#/browse?id=" + id} target="_blank" rel="noopener noreferrer">ratemysite.xyz/#/browse?id={id}</a>
                        <div className="buttons">
                            <button className="close" onClick={() => setPopupOpen(false)}>Close</button>
                        </div>
                    </>
                    :
                    <>
                        <h4>Uh Oh!</h4>
                        <p>Looks like something went wrong. Try submitting your post again.</p>
                        <div className="buttons">
                            <button className="close" onClick={() => setPopupOpen(false)}>Close</button>
                        </div>
                    </>
                }
                
            </div>
        )
    }

    useEffect(() => {
        if (id) {
            setShowFinalizedPopup(true);
        }
    }, [id])

    return (
        <div className={"postPopup " + (transition ? "mount" : "unmount")}>
            {
                showConfirmationPopup && !showFinalizedPopup && confirmationPopup()
            }
            {
                showFinalizedPopup && finalizedPopup()
            }
        </div>
    )
}