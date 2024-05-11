import React, { useEffect, useState } from 'react'
import Blogs from './Blogs'
import { useSelector } from 'react-redux';

const Post = () => {
  const search = useSelector(state=>state.search.search)
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    fetch('https://blogappapi.vercel.app/post').then((response)=>{
      response.json().then((posts)=>{
        setPosts(posts)
      })
    })
  },[])

  return (
    <div>

      {
        posts.length > 0 && 
        
        posts.filter((i)=>{
          return ( i.title.toLowerCase().includes(search.toLowerCase()) );
        }).map((post,i)=>{
          return (
            <Blogs key={i} {...post} />
          )
        })
      }
    </div>
  )
}

export default Post