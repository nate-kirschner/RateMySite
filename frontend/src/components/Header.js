import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import useOutsideClickedAction from '../util/useOutsideClickedAction';

import '../styles/header.scss';
import SearchDropdown from './SearchDropdown';
import Sorter from './Sorter';

export default function Header({ setSelectedPost, sort, setSort }) {

    const location = useLocation();

    const [browseRef, setBrowseRef] = useState();
    const searchRef = useRef();
    const postRef = useRef();

    const sliderRef = useRef();
    const [searchDropdownRef, setSearchDropdownRef] = useState();

    const [sliderDimensions, setSliderDimensions] = useState({});
    const [searchSelected, setSearchSelected] = useState(false);
    const [searchText, setSearchText] = useState("");

    const deselectSearchBar = () => {
        setSearchSelected(false); 
        setSearchText(""); 
    }

    useOutsideClickedAction(deselectSearchBar, sliderRef, searchDropdownRef);

    useEffect(() => {
        window.removeEventListener('resize', createSlider);
        createSlider();
        window.addEventListener('resize', createSlider);
    }, [browseRef, searchRef, postRef, location, searchSelected])

    const createSlider = () => {
        if (!searchSelected) {
            let top, left, width, height;
            if (searchRef.current && postRef.current && browseRef && browseRef.current) {
                switch (location.pathname) {
                    case "/post":
                        top = postRef.current.offsetTop;
                        left = postRef.current.offsetLeft;
                        width = postRef.current.offsetWidth;
                        height = postRef.current.offsetHeight;
                        break;
                    case "/":
                    default:
                        top = browseRef.current.offsetTop;
                        left = browseRef.current.offsetLeft;
                        width = browseRef.current.offsetWidth;
                        height = browseRef.current.offsetHeight;
                }

                setSliderDimensions({
                    left: `${left - 7}px`,
                    width: `${width + 14}px`,
                    height: `${height + 14}px`,
                    top: `${top - 7}px`
                })
            }
        }
    }
    
    const searchClicked = () => {
        if (!searchSelected) {
            setSearchSelected(true);

            let top = searchRef.current.offsetTop;
            let left = browseRef.current.offsetLeft;
            let width = postRef.current.offsetLeft + postRef.current.offsetWidth - browseRef.current.offsetLeft;
            let height = postRef.current.offsetHeight;

            setSliderDimensions({
                left: `${left - 7}px`,
                width: `${width + 14}px`,
                height: `${height + 14}px`,
                top: `${top - 7}px`
            })
        }
    }

    return (
        <div className="header">
            <h2 className={`menuLink ${searchSelected && "searchSelected"}`}  >
                <Link to="/">
                    <Sorter searchSelected={searchSelected} sort={sort} setSort={setSort} setBrowseRef={setBrowseRef} />
                </Link>
            </h2>
            <h2 className={`menuLink ${searchSelected && "searchSelected"}`} ref={searchRef} onClick={() => searchClicked()}>
                <Link to={`${location.pathname}`}>
                    Search
                    <div className={"dropdownTriangle " + "hidden"} />
                </Link>
            </h2>
            <h2 className={`menuLink ${searchSelected && "searchSelected"}`} ref={postRef}>
                <Link to="/post">
                    Post
                </Link>
            </h2>
            
            {
                <div className={`slider ${searchSelected ? "searchSelected" : ""}`}
                    ref={sliderRef}
                    style={{
                        left: sliderDimensions.left,
                        width: sliderDimensions.width,
                        height: sliderDimensions.height,
                        top: sliderDimensions.top
                    }}
                >
                    {
                        searchSelected && (
                            <input type="text" className="searchboxInput" autoFocus placeholder="Search for a url or post title" 
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        )
                    }
                </div>
            }
            {
                searchSelected && 
                    <SearchDropdown 
                        searchText={searchText} 
                        style={{
                            position: "absolute",
                            width: sliderRef.current.offsetWidth,
                            left: sliderRef.current.offsetLeft,
                            top: sliderRef.current.offsetTop + sliderRef.current.offsetHeight
                        }}
                        setSelectedPost={setSelectedPost}
                        setSearchDropdownRef={setSearchDropdownRef}
                        deselectSearchBar={deselectSearchBar}
                    />
            }
        </div>
    )
}