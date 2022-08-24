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
            <h2 className="title">Hi! Welcome to <span className="logoText">Rate My Site</span>.</h2>
            <p className="subtitle">A collection of personal websites.</p>

            <p className="browseText">Browse personal websites and leave constructive feedback.</p>
            <button className="browseButton" onClick={() => goToPage("/browse")}>Browse Websites</button>
            
            <div className="browseFollowUp">
                <p>Why Browse?</p>
                <ul>You are looking for inspiration for your own site.</ul>
                <ul>You want to give back to the community by leaving helpful comments on the work of others.</ul>
                <ul>You're looking to pass some time.</ul>
            </div>
            
            <p className="postTextext">Post your own website to be viewed by the community.</p>
            <button className="postButton" onClick={() => goToPage("/post")}>Post Your Own</button>

            <div className="browseFollowUp">
                <p>Why Post?</p>
                <ul>You are looking for feedback on your personal website.</ul>
                <ul>You want to inspire others with your work and add your site to this growing collection.</ul>
                <ul>You want some validation after completing your project.</ul>
            </div>

            
        </div>
    )
}