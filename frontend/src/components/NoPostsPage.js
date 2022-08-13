import { useEffect, useState } from 'react';

import '../styles/noPostsPage.scss';
import '../styles/postSnippet.scss';

export default function NoPostsPage() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => setLoaded(true), 50);
    }, []);

    return (
        <div className={"noMorePosts postSnippet " + (loaded && "loaded")}>
            <div className="mainBlock">
                <div className="titleBlock">
                    <h3 className="postTitle">No More Posts...</h3>
                    
                </div>
                <div className="likesBlock">
                    <svg
                        viewBox="0 0 32 29.6"
                        className={"heart " }
                        
                    >
                        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                    </svg> 
                </div>
                <div className="siteBlock thumbnail">
                    
                    <div className="iframe">
                        <p>There are no more posts to view at this time. Feel free to make your own!</p>
                    </div>
                </div>
                <div className="pageButtons">
                    
                </div>
                
            </div>
           
        </div>
    )
}