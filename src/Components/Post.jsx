import React, { useEffect, useState } from 'react'
import Blogs from './Blogs'
import { useSelector } from 'react-redux';

const Post = () => {
  const search = useSelector(state=>state.search.search)
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    fetch('https://blogappapi.vercel.app/post').then((response)=>{
      response.json().then((posts)=>{
        setPosts(posts)
        setLoading(true)
      })
    })
  },[])

  return (
    <div>

      {

        loading ? (
          posts.length > 0 && 
          
          posts.filter((i)=>{
            return ( i.title.toLowerCase().includes(search.toLowerCase()) );
          }).map((post,i)=>{
            return (
              <Blogs key={i} {...post} />
            )
          })
        ) : (
          <p>Loading.....</p>
        )
      }
    </div>
  )
}

export default Post