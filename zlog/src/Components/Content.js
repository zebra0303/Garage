import React, { useEffect, useRef } from 'react';

const Content = props => {
  const { arrContent } = props;
  const refContent = useRef(null);
  
  useEffect(()=> {
    arrContent.map(obj => {
      const tag = Object.keys(obj)[0];
      const elem = document.createElement(tag);
  
      if(tag === "p") {
        //elem.textContent = obj[tag];
        obj[tag].split('\n').map((line, idx, arr) => {
          elem.append(line);
          if(arr.length > idx + 1) {
            elem.append(document.createElement('br'));
          }
        });
      }
      else if(tag === "img") {
        elem.src = obj[tag].src;
        elem.width = obj[tag].width;
        elem.height = obj[tag].height;
      }
      refContent.current.append(elem);
    });
  }, [arrContent]);

  return (
    <div ref={refContent} className="content">
    </div>
  );
};

export default Content;