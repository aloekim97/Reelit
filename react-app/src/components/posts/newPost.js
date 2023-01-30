import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPostThunk } from "../../store/post"
import { useState, useEffect } from "react"
import { Redirect, useHistory } from "react-router-dom"
import './newpost.css'
import { loadCommunityThunk, loadOneCommunityThunk } from "../../store/community"
// import Dropdown from "./dropdownSelect"

export default function NewPost() {
    // const comunities = useSelector(state.)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [community_id, setCommunity_id] = useState()
    const dispatch = useDispatch()
    const history = useHistory()
    const comms = useSelector(state => state.community.allCommunities)
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(!open);
      };
      useEffect(() => {
          if (!open) return;
      
          const closeMenu = () => {
            setOpen(false);
          };
      
          window.addEventListener('click', closeMenu);
      
          return () => window.removeEventListener("click", closeMenu);
        }, [handleOpen]);
  

    useEffect(() => {
        dispatch(loadCommunityThunk())
    },[dispatch]) 


    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            title,
            content,
            community_id
        }
        await dispatch(createPostThunk(post))
        history.push('/')
    }
    const name = comms[community_id]?.name

    return(
        <div className="page-cont">
            <div className="create-t">Create a post</div>
            <div className="sel-comm">
                <div className="comm-drop" onClick={handleOpen}>{name ? name : "Select a community"}
                {open ? 
                <div className="drop-box">
                    {Object.values(comms).map((comm) => (
                        <form onSubmit={handleSubmit}>
                        <button key={comm.id} 
                        className='options' 
                        onClick={e => setCommunity_id(comm.id)}
                        value={community_id}>
                            {comm.name}
                        </button>
                        </form>
                    ))}
                </div> : null }     
            </div>
            </div>
            <div className="create-post-box">
                    <div className="post-options">
                        <button className="post1" type="button">Post</button>
                        <div className="post2">Images & Videos</div>
                        <div className="post2">Link</div>
                        <div className="post2">Poll</div>
                        <div className="post2">Talk</div>
                    </div>
                    <form onSubmit={handleSubmit} className="make-edit">
                        <input className="input-title"
                        placeholder="title" 
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}
                        />
                        <textarea className="input-content"
                        placeholder="Text(optional)"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <div className="butt-loc">
                        <button className="butt" type="submit">Post</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

{/* <form onSubmit={handleSubmit} className="commmmm">
<input className="input-comm"
placeholder="community_id" 
value={community_id}
required
onChange={e => setCommunity_id(e.target.value)}/>
</form> */}