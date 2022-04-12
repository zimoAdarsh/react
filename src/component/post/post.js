import { toggleButtonClasses } from '@mui/material'
import { fontSize } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiService from '../../environment'
import './post.css'
import DialogBox from '../dialog'
const Post = ({ data, comment, index, like, addComment }) => {
    const [commentsState, setCommentState] = useState({
        commenting: ''
    })
    const [classIn, setClass] = useState(false)
    const content = 'Are you sure you want to delete this post'

    function handleState(name, value) {
        setCommentState({
            ...commentsState,
            [name]: value
        })
    }

    const commentor = (id) => {
        console.log('id', id, commentsState.commenting)
    }
    const toggleClass = () => {
        setClass(!classIn)
    }

    const clicked = ()=>{
        console.log('gggg')
    }

    return (
        <div className='post'>
            <div className='row post_header'>
                <div className='col-sm-3'>
                    {/* <img className='avatar' src={apiService.imagePath + data.userData?.image}></img> */}
                </div>
                <div className='col-sm-6 '>
                    <h6>{data.personName}</h6>
                    <span className='posted_at'>{data.postedAt}</span>
                </div>
                <div className='col-sm-3'>
                    <i className="fa fa-ellipsis-v" onClick={() => toggleClass()}></i>
                    <div className={classIn ? 'list' : 'no_list'}>
                        <ul className='cus_menu'>
                            <li><DialogBox function={clicked} content={content}></DialogBox> </li>
                        </ul>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 mt-5 mb-5'>
                        <div>{data.caption}</div>
                    </div>
                </div>
                <div className='row'>
                    {
                        data.isLiked ?
                            <div className='col-sm-4' onClick={() => like(data._id, data.isLiked, index)}>
                                <i style={{ fontSize: "24px", cursor: 'pointer', color: ' #0685b9' }} className={data.isLiked ? 'like_post fa' : '.dislike_post fa'}>&#xf087;</i>
                            </div> :
                            <div className='col-sm-4' onClick={() => like(data._id, true, index)}>
                                <i style={{ fontSize: "24px", cursor: 'pointer', color: 'black' }} className="fa">&#xf087;</i>
                            </div>}
                    <div className='col-sm-4' onClick={() => comment(data._id, index, data.commentPage, 5)}>
                        {data.totalComment}   <i className='fa icon_class'>&#xf075;</i>
                    </div>
                    <div className='col-sm-4'>
                        <i className="fa fa-share-alt icon_class" ></i>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-11 mt-3'>
                        <input type='text' placeholder='type here' className='cmnt_inpt' value={commentsState.commenting} name='commenting' onChange={(e) => handleState(e.target.name, e.target.value)}></input>
                    </div>
                    <div className='col-sm-1 mt-4' onClick={() => addComment(data._id, commentsState.commenting)}>
                        <i className="fa fa-send-o icon_class"></i>
                    </div>
                </div>
                {
                    <div className='commentList mt-4'>
                        {data.comments.map((comment) =>
                            <div className='row p-1 comments'>
                                <div className='col-sm-2'>
                                    <img className='cmnt_img' src={apiService.imagePath + comment.image}></img>
                                </div>
                                <div className='col-sm-10 comment p-2'>
                                    {comment.comment}
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>



        </div>
    )
}

export default Post