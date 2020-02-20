import React from 'react';
import Post from './Components/Post';
import './App.scss';
import listPosts from './JSON/index.json';

function App() {
  return (
    <div className="App">
      {listPosts.map(pid=><Post key={pid} pid={pid} />)}
    </div>
  );
}

export default App;
