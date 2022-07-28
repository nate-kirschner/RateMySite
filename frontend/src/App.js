import './App.scss';
import Header from './components/Header';
import Browse from './components/Browse';
import { Routes, Route, useLocation } from 'react-router-dom';
import Post from './components/Post';
import { useEffect, useState } from 'react';
import { SORTING } from './util/Constants';
import Home from './components/Home';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  
  const [sort, setSort] = useState(localStorage.getItem("sorting") ? SORTING[localStorage.getItem("sorting")] : SORTING["Most Liked"]);

  const [showHeader, setShowHeader] = useState(false);

  const location = useLocation();

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
      <Header setSelectedPost={setSelectedPost} sort={sort} setSort={setSort} showHeader={showHeader} />
    
      <Routes>
        <Route path="/" element={<Home setShowHeader={setShowHeader} />} />
        <Route path="/browse" element={<Browse selectedPost={selectedPost} setSelectedPost={setSelectedPost} sort={sort} />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
