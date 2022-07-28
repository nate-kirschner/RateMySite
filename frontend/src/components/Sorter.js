import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SORTING } from '../util/Constants';
import useOutsideClickedAction from '../util/useOutsideClickedAction';

import '../styles/sorter.scss';

export default function Sorter({ searchSelected, sort, setSort, setBrowseRef }) {

    let location = useLocation();

    const browseRef = useRef();
    const textDivRef = useRef();
    const sortOptionsRef = useRef();

    const [displaySortOption, setDisplaySortOptions] = useState(false);

    useOutsideClickedAction(() => setDisplaySortOptions(false), sortOptionsRef, textDivRef, browseRef);

    useEffect(() => {
        setBrowseRef(browseRef)
    }, [])

    const clickedBrowse = () => {
        if (location.pathname === "/browse" && !displaySortOption) {
            setDisplaySortOptions(true);
        } else if (displaySortOption) {
            setDisplaySortOptions(false);
        }
    }

    return (
        <div className="sorter" >
            <div ref={browseRef} className="browseTitle" onClick={() => clickedBrowse()}>
                Browse
                <div className={"dropdownTriangle " + (location.pathname === "/browse" && !searchSelected ? "visible" : "hidden")} />
            </div>
            {
                location.pathname === "/browse" && !searchSelected && (
                    <div className="selectedSortDiv"
                        ref={textDivRef}
                        style={{
                            left: `${browseRef.current && textDivRef.current
                                ?  (browseRef.current.offsetLeft + (browseRef.current.offsetWidth / 2)) - (textDivRef.current.offsetWidth / 2)
                                : 0}px`,
                            top: `${browseRef.current ? (browseRef.current.offsetTop + browseRef.current.offsetHeight) : 0}px`
                        }}
                    >

                        <span className="fa fa-star checked"></span>
                        <h4 className="selectedSortOption">{sort.displayName}</h4>
                    </div>
                )
            }
            {
                <div className={"displaySortOptions " + (displaySortOption ? "show" : "hide")}
                    ref={sortOptionsRef}
                    style={{
                        left: `${Math.max(browseRef.current && sortOptionsRef.current
                            ?  (browseRef.current.offsetLeft + (browseRef.current.offsetWidth / 2)) - (sortOptionsRef.current.offsetWidth / 2)
                            : 0, 0)}px`,
                        top: `${textDivRef.current ? (textDivRef.current.offsetTop + textDivRef.current.offsetHeight) : 0}px`
                    }}
                >
                    {
                        Object.entries(SORTING).map(([key, value]) => {
                            if (value !== sort) {
                                return (
                                    <div className={"sortOption "}
                                        onClick={() => {
                                            setSort(value);
                                            setDisplaySortOptions(false);
                                        }}
                                    >
                                        {value.displayName}
                                    </div>
                                )
                            }
                        })
                    }
                </div> 
            }
        </div>
    )
}