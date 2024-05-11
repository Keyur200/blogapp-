import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import { format } from 'timeago.js';
import { UserContext } from '../UserContext';
import { FaEdit } from 'react-icons/fa'
import { BiSolidLike, BiLike, BiSolidDislike, BiDislike } from 'react-icons/bi'
import { toast } from 'react-toastify'
const PostDetailPage = () => {
    const [postInfo, setpostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        function getData() {
            fetch(`http://localhost:4000/post/${id}`)
                .then((response) => response.json()
                    .then(postinfo => {
                        setpostInfo(postinfo);
                    }))
        }
        getData()
    }, [][handleLikes, handleDislikes])

    if (!postInfo) return '';




    async function handleLikes(id) {
        const response = await fetch('http://localhost:4000/like', {
            method: 'PUT',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
            .then(response => {
                if (response.error) {
                    toast.error(response.error)
                }
            })

    }
    async function handleDislikes(id) {
        await fetch('http://localhost:4000/dislike', {
            method: 'PUT',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
            .then(response => {
                if (response.error) {
                    toast.error(response.error)
                }
            })
    }


    async function handleComment(text, postId) {
        await fetch('http://localhost:4000/comment', {
            method: 'PUT',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId,
                text,
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    toast.error(result.error)
                } else {
                    const newdata = postInfo.map(item => {
                        if (item._id === result._id) {
                            return result;
                        } else {
                            return item;
                        }
                    }); setpostInfo(newdata);
                    setpostInfo("");
                }
            })

    }
    return (
        <div>
            <Navbar />
            <div className="w-[100%] lg:w-[80%] flex flex-col lg:flex-row justify-center m-auto mt-10 max-h-[2000px] lg:max-h-[1000px]  mb-10 ">
                <div className="lg:w-[70%] w-full flex flex-col overflow-y-auto scrollbar-hide  items-center border-2 lg:border-slate-200 shadow-xl py-5 px-10">
                    <h1 className="text-2xl lg:text-4xl mt-5 font-bold">{postInfo.title}</h1>
                    <h1 className="text-lg mt-3 font-semibold">by {postInfo.author.username}</h1>
                    <h1 className="text-sm mt-1 mb-4 font-medium text-slate-700 ">{format(postInfo.createdAt)}</h1>

                    <div>
                        <img className="w-[100%] mb-5 lg:mb-10 h-[200px] lg:h-[400px] object-contain" src={postInfo.cover} alt="" />
                    </div>


                    <div>
                        <p dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                    </div>
                </div>
                <div className="w-full lg:w-[30%] bg-gray-100 max-h[20vh] py-5 px-3 scrollbar-hide overflow-x-hidden">
                    <div className="flex gap-7 w-[100%]  items-center justify-center mr-10 mb-6">
                        <div className="flex flex-col items-center">
                            <p>Likes</p>
                            <button onClick={() => { handleLikes(postInfo._id) }} className="text-xl flex items-center transition-all duration-500  gap-1">
                                {postInfo.likes.includes(userInfo.id) ? <BiSolidLike /> : <BiLike />}
                                <p className="text-lg">{postInfo.likes.length}</p>
                            </button>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Dislikes</p>
                            <button onClick={() => { handleDislikes(postInfo._id) }} className="text-xl flex items-center  transition-all duration-500 gap-1">
                                {postInfo.dislikes?.includes(userInfo.id) ? <BiSolidDislike /> : <BiDislike />}
                                <p className="text-lg">{postInfo.dislikes.length}</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <h1 className="font-semibold text-lg">Comments ({postInfo.comments.length})</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleComment(e.target[0].value, postInfo._id)
                        }}>
                            <input className="outline-none w-[100%] bg-transparent border-2 border-gray-200 p-2" type="text" placeholder='Comment here...' />
                        </form>
                        <div className="overflow-y-scroll scrollbar-hide">
                            {
                                postInfo.comments.length > 0 ?
                                    postInfo.comments.map(record => {
                                        return (

                                            <div className="flex flex-col mb-3 w-full ">
                                                <div className='flex justify-between'>
                                                    <span className="font-semibold text-md w-[20%] flex flex-wrap">@{record.postedBy?.username}</span>
                                                    <span className="font-normal text-sm  flex flex-wrap">{format(record.created)}</span>
                                                </div>
                                                <span className="ml-3"> - {record.text}</span>
                                                <hr className="mt-2 " />
                                            </div>

                                        )
                                    })
                                    : <h1 className="flex text-lg font-semibold justify-center w-full">No comments yet.</h1>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostDetailPage