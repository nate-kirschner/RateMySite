import axios from "axios"
import { useEffect, useState, useRef } from "react"
import config from "../config"
import { useNavigate } from 'react-router';

import '../styles/searchDropdown.scss';

export default function SearchDropdown({ searchText, style, setSelectedPost, setSearchDropdownRef, deselectSearchBar }) {

    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const dropdownRef = useRef();

    useEffect(() => {
        setSearchDropdownRef(dropdownRef)
    }, [])

    useEffect(() => {
        if (searchText !== "") {
            const body = {
                sort: "search",
                searchString: searchText
            }
            axios.post(config.url + "/get-posts", body).then(resp => {
                setPosts(resp.data);
            })
        } else {
            setPosts([]);
        }
    }, [searchText])

    return (
        <div className="searchDropdown" style={style} ref={dropdownRef} >
            {
                posts.map(post => {
                    return (
                        <div className="searchOption" onClick={() => {setSelectedPost(post); deselectSearchBar(); navigate('/');}}>
                            <h3 className="title">{post.title}</h3>
                            <p className="url">{post.url}</p>
                            <h4 className="description">{post.description}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}