import './App.scss';
import Header from './components/Header';
import Browse from './components/Browse';
import { Routes, Route, useLocation } from 'react-router-dom';
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

  const [showHeader, setShowHeader] = useState(false);
  const [sliderDimensions, setSliderDimensions] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [index, setIndex] = useState([0, 5])

  const prev = usePrevious({ sort });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("sorting", sort.keyName);
  }, [sort])

  useEffect(() => {
    if (location.pathname === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname])

  useEffect(() => {
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
  }, [index]);

  useEffect(() => {
    if (prev && prev.sort !== null && prev.sort !== sort) {
      setIndex([0, 5]);
    }
  }, [sort])

  return (
    <div className="App">
      <Logo 
        className="logo" 
        onClick={() => location.pathname === "/" ? navigate("/browse") : navigate("/")} 
        style={{
          height: sliderDimensions.height,
          top: "calc(" + sliderDimensions.top + " + 5px)",
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
          />
        } />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
