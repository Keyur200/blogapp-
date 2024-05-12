import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [files, setFiles] = useState();
    const [content, setContent] = useState();
    const [redirect, setRedirect] = useState(false);
    const [link, setUrl] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    function createNewPost(e) {
        e.preventDefault();
        const Data = new FormData();
        Data.append('file', files);
        Data.append("upload_preset", "blogapp")
        Data.append("cloud_name", "dxqcanezw")
        fetch('https://api.cloudinary.com/v1_1/dxqcanezw/image/upload', {
            method: 'POST',
            body: Data,
        }).then(res => res.json())
        .then(data => {
            setUrl(data.url)
            setLoading(true)
            })
            .catch(err => console.log(err))
        console.log(link);
        link && (
            fetch('https://blogappapi.vercel.app/post', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, summary, content, pic: link }),
                credentials: 'include'
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error)
                    } else {
                        setLoading(false)
                        toast.success("Blog created successfully")
                        navigate('/')
                    }
                })
        )

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <Navbar />
            <div>
                <form onSubmit={createNewPost} className="flex flex-col w-[100%] lg:w-[50%] m-auto mt-10 gap-6 p-20" >
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border-2 border-slate-300 rounded-sm outline-none" type="text" placeholder='Title' />
                    <input value={summary} onChange={(e) => setSummary(e.target.value)} className="p-2 border-2 border-slate-300 rounded-sm outline-none" type="text" placeholder='Summary' />
                    <input onChange={(e) => setFiles(e.target.files[0])} className="p-2 border-2 border-slate-300 rounded-sm outline-none" type="file" />
                    <ReactQuill value={content} onChange={newVal => setContent(newVal)} />
                    {loading && (
                        <button disabled className="w-[100%] bg-slate-600 text-xl font-semibold transition-all duration-300 text-white hover:bg-slate-500 p-2 rounded-md">Loading</button>
                    )}
                    {!loading && (<button className="w-[100%] bg-slate-600 text-xl font-semibold transition-all duration-300 text-white hover:bg-slate-700 p-2 rounded-md">Create Post</button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Create