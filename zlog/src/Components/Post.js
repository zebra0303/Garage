import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from './Content';

const Post = props => {
  const { pid } = props;
  const [title, setTitle] = useState('');
  const [arrContent, setArrContent] = useState([]);
  useEffect(()=> {
    axios.get('/Posts/' + pid + '.json')
      .then(res=> {
        if(res.status === 200) {
          setArrContent(res.data.content);
          setTitle(res.data.title);
        }
      })
      .catch(err => {
        console.log("Err!!!", err.response);
      });
  }, [pid]);

  return (
    <div>
      <h1>{title}</h1>
      <Content arrContent={arrContent} />
    </div>
  )
};

export default Post;