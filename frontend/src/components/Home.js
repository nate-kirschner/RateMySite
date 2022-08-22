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

            <p className="browseText">Browse personal websites and leave constructive feedback.</p>
            <button className="browseButton" onClick={() => goToPage("/browse")}>Browse Websites</button>
            
            <p className="browseFollowUp">
                <p>Why Browse?</p>
                <ul>Maybe you are looking for inspiration for your own site.</ul>
                <ul>Maybe you want to give back to the community with helpful comments on their work.</ul>
                <ul>Maybe you're looking to pass some time.</ul>
            </p>
            
            <p className="postTextext">Post your own website to be reviewed by the community.</p>
            <button className="postButton" onClick={() => goToPage("/post")}>Post Your Own</button>

            <p className="browseFollowUp">
                <p>Why Post?</p>
                <ul>Maybe you are looking for advice or criticism on your personal website.</ul>
                <ul>Maybe you want to inspire others with your work and add your site to this growing collection.</ul>
                <ul>Maybe you want some validation after completing your project.</ul>
            </p>

            
        </div>
    )
}