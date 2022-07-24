import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

import '../styles/home.scss';

export default function Home({ setShowHeader }) {

    let navigate = useNavigate();

    const goToPage = (path) => {
        setShowHeader(true);
        navigate(path);
    }

    return (
        <div className="home mainpage">
            <h2 className="title">Hi! Welcome to RateMySite.</h2>
            <p className="browseText">Browse personal websites and leave constructive feedback.</p>
            <button className="browseButton" onClick={() => goToPage("/browse")}>Browse Websites</button>
            
            <p className="postTextext">Post your own website to be reviewed by the community.</p>
            <button className="postButton" onClick={() => goToPage("/post")}>Post Your Own</button>
        </div>
    )
}