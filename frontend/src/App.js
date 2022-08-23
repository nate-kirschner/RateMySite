import './App.scss';
import Header from './components/Header';
import Browse from './components/Browse';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import Post from './components/Post';
import { useEffect, useState } from 'react';
import { SORTING } from './util/Constants';
import Home from './components/Home';
import { ReactComponent as Logo } from './images/default-monochrome copy.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import config from './config';
import usePrevious from './util/usePrevious';

function App() {  
  const [sort, setSort] = useState(localStorage.getItem("sorting") ? SORTING[localStorage.getItem("sorting")] : SORTING["Most Liked"]);

  useEffect(() => {
    localStorage.setItem("sorting", sort.keyName);
  }, [sort])

  const [showHeader, setShowHeader] = useState(false);
  const [sliderDimensions, setSliderDimensions] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [postList, setPostList] = useState([]);
  const [index, setIndex] = useState(JSON.parse(localStorage.getItem("index")) || [0, 5]);
  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index))
  }, [index])

  const prev = usePrevious({ sort });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname])

  useEffect(() => {
    const postId = new URLSearchParams(location.search).get('id');
    if (!isNaN(parseInt(postId))) {
      getPostById(postId);
    } else {
      getPostByIndex();
    }
  }, [index]);

  const getPostByIndex = () => {
    const body = {
      startIdx: index[0],
      endIdx: index[1],
      sort: sort
    }
    setLoading(true);
    axios.post(config.getPostUrl, body).then(resp => {
      if (resp.data.length === 0) {
        setIndex([0, 5]);
      }
      setPostList(resp.data);
      setLoading(false)
    })
  }

  const [listIndex, setListIndex] = useState(parseInt(localStorage.getItem("listIndex")) || 0);
  useEffect(() => {
      localStorage.setItem("listIndex", listIndex)
  }, [listIndex])

  const getPostById = (postId) => {
    if (postId !== null) {
        if (!postList[listIndex] || postId != postList[listIndex].id) {
            const body = {
                postId,
                sort: "id"
            }
            axios.post(config.getPostUrl, body).then(resp => {
                if (resp.data.length !== 0) {
                    setPostList([resp.data[0]]);
                    // setSearchParams({});
                    setListIndex(0)
                } else {
                    setPostList([]);
                    setSearchParams({});
                }
            })
        }
    }
  }

  useEffect(() => {
    if (prev && prev.sort !== null && prev.sort !== sort) {
      setIndex([0, 5]);
      setListIndex(0);
    }
  }, [sort])

  return (
    <div className="App">
      <Logo 
        className="logo" 
        onClick={() => location.pathname === "/" ? navigate("/browse") : navigate("/")} 
        style={{
          height: "calc(" + sliderDimensions.height + " + 5px)",
          top: "calc(" + sliderDimensions.top + " - 1em)",
        }}
        />

      <Header setPostList={setPostList} sort={sort} setSort={setSort} showHeader={showHeader} sliderDimensions={sliderDimensions} setSliderDimensions={setSliderDimensions} />
    
      <Routes>
        <Route path="/" element={<Home setShowHeader={setShowHeader} />} />
        <Route path="/browse" element={
          <Browse 
            postList={postList}
            setPostList={setPostList}
            index={index}
            setIndex={setIndex}
            loading={loading}
            getPostById={getPostById}
            listIndex={listIndex}
            setListIndex={setListIndex}
          />
        } />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
