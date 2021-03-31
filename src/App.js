import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Card from './components/Card/Card';

function App() {
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [element, setElement] = useState(null);
  const [start, setStart] = useState(() => {
    return 0;
  });
  const [isloading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('loading...');
  
  
  const observer = useRef(
    new IntersectionObserver(entries => {
      console.log(entries[0]);
      if (entries[0].isIntersecting) {
        setStart(prevStart => {
          return (prevStart + limit);
        });
      }
    },
      {
        threshold: 1
      }
    )
  );

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if(result.length === 0){
        setLoadingMsg('Reached end');
        const currentElement = element;
        const currentObserver = observer.current;
        currentObserver.unobserve(currentElement);
      }else{      
        setPosts(prevPost => [...prevPost, ...result]);
        setLoading(false);
      }
    })
    .catch(error => console.log('error', error));
  }, [start]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    }
  }, [element]);

  return (
    <div className="app">
      {
        posts.map(post => <Card key={post.id} title={post.title} body={post.body} id={post.id} />)
      }
      <p ref={setElement} className="loader">{ isloading? loadingMsg : ''}</p>
    </div>
  );
}

export default App;
