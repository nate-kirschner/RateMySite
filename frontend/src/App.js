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


function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  
  const [sort, setSort] = useState(localStorage.getItem("sorting") ? SORTING[localStorage.getItem("sorting")] : SORTING["Most Liked"]);

  const [showHeader, setShowHeader] = useState(false);
  const [sliderDimensions, setSliderDimensions] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

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

      <Header setSelectedPost={setSelectedPost} sort={sort} setSort={setSort} showHeader={showHeader} sliderDimensions={sliderDimensions} setSliderDimensions={setSliderDimensions} />
    
      <Routes>
        <Route path="/" element={<Home setShowHeader={setShowHeader} />} />
        <Route path="/browse" element={<Browse selectedPost={selectedPost} setSelectedPost={setSelectedPost} sort={sort} />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
