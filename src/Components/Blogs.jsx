import React from 'react'
import { BiComment, BiSolidComment, BiSolidLike } from 'react-icons/bi'
import { FaComment, FaComments, FaThumbsUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

const Blogs = ({ _id, title, summary, content, cover, createdAt, author, likes, comments }) => {
    return (
        <div>
            <div className=" border-2 border-slate-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col lg:flex lg:justify-center lg:items-center lg:mr-auto lg:ml-auto lg:w-[70%] shadow-lg shadow-black-100 mx-7 p-3 lg:p-6 mt-10 mb-10">
                <Link to={`/post/${_id}`}>
                    <div className="flex flex-col lg:flex-row w-[100%] lg:gap-8">
                        <div className="w-[100%] lg:w-[50%] p-5 lg:p-0">
                            <img className="w-full transition-all duration-300 ease-in-out hover:scale-105 object-cover" src={cover} alt="Cover" />
                        </div>
                        <div className="w-[100%] lg:w-[50%] flex mt-3 flex-col gap-4 ">
                            <h2 className="font-bold text-2xl">{title}</h2>
                            <div className="flex justify-between ">
                                <div className="flex flex-row  items-center gap-5">
                                    <p className="font-semibold text-lg">By {author.username}</p>
                                    <span className="text-sm font-semibold text-slate-600">{format(createdAt)}</span>
                                </div>
                                <div className="flex flex-row  items-center gap-5">
                                    <span className="text-md flex items-center gap-1 font-semibold text-slate-700">{likes.length}<BiSolidLike className="text-lg" /></span>
                                    <span className="text-md flex items-center gap-1 font-semibold text-slate-700">{comments.length}<FaComment /></span>
                                </div>
                            </div>

                            <p>{summary.slice(0, 440)} ... <button className="text-blue-500 text-md">Read more</button></p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Blogs