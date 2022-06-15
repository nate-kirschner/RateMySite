import './App.scss';
import Header from './components/Header';
import Browse from './components/Browse';
import { Routes, Route } from 'react-router-dom';
import Post from './components/Post';
import { useEffect, useState } from 'react';
import { SORTING } from './util/Constants';

function App() {

  const [selectedPost, setSelectedPost] = useState(null);

  const [sort, setSort] = useState(SORTING["Least Liked"])

  return (
    <div className="App">
      <Header setSelectedPost={setSelectedPost} sort={sort} setSort={setSort} />
    
      <Routes>
        <Route path="/" element={<Browse selectedPost={selectedPost} setSelectedPost={setSelectedPost} sort={sort} />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
