import axios from "axios"
import { useEffect, useState, useRef } from "react"
import config from "../config"
import { useNavigate } from 'react-router';

import '../styles/searchDropdown.scss';

export default function SearchDropdown({ searchText, style, setPostList, setSearchDropdownRef, deselectSearchBar }) {

    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const dropdownRef = useRef();

    useEffect(() => {
        setSearchDropdownRef(dropdownRef)
    }, [])

    useEffect(() => {
        
    }, [searchText])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText !== "") {
                const body = {
                    sort: "search",
                    searchString: searchText
                }
                axios.post(config.getPostUrl, body).then(resp => {
                    setPosts(resp.data);
                })
            } else {
                setPosts([]);
            }
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchText])

    return (
        <div className="searchDropdown" style={style} ref={dropdownRef} >
            {
                posts.map(post => {
                    return (
                        <div className="searchOption"
                            onClick={() => {
                                setPostList([post]); 
                                deselectSearchBar(); 
                                navigate('/browse');
                            }}>
                            <h3 className="title">{post.title}</h3>
                            <p className="url">{post.url}</p>
                            {/* <h4 className="description">{post.description}</h4> */}
                        </div>
                    )
                })
            }
        </div>
    )
}