import { toggleButtonClasses } from '@mui/material'
import { fontSize } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiService from '../../environment'
import './post.css'
import DialogBox from '../dialog'
import { toast } from "react-toastify";

const Post = ({ data, comment, index, like, postComment, reCommentList, deletePost }) => {

    const [commentsState, setCommentState] = useState({
        commenting: ''
    })
    const [classIn, setClass] = useState(false)
    const [postInput, setPostInput] = useState(null)
    const content = 'Are you sure you want to delete this post'

    function handleState(name, value) {
        setCommentState({
            ...commentsState,
            [name]: value
        })
    }
    const toggleClass = () => {
        setClass(!classIn)
    }


    return (
        <div className='post'>
            <div className='row post_header' >
                <div className='col-sm-3'>
                    <img className='avatar' src={apiService.imagePath + data.userData?.image}></img>
                </div>
                <div className='col-sm-6 '>
                    <h6>{data.personName}</h6>
                    <span className='posted_at'>{data.postedAt}</span>
                </div>
                <div className='col-sm-3'>
                    <i className="fa fa-ellipsis-v" onClick={() => toggleClass()}></i>
                    <div className={classIn ? 'list' : 'no_list'}>
                        <ul className='cus_menu'>
                            <li onClick={() => { deletePost(index); toggleClass() }} > Delete </li>
                            {/* {isOpen && <DialogBox functions={() => deletePost(data._id, index)} content={content} handelopen={setOpen} open={isOpen} ></DialogBox>} */}
                        </ul>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 mt-5 mb-5 post_data'>
                        <p className='caption'>
                            {data.caption}
                        </p>
                        <div className='post_media'>
                            <img className="w-100" src={ apiService.postImagePath+data.media[0]?.name }></img>
                        </div>

                    </div>
                </div>
                <div className='row '>
                    <div className='actions'>
                        <div className='col-sm-4' onClick={() => like(data._id, !data.isLiked, index)}>
                            <i style={{ fontSize: "24px", cursor: 'pointer' }} className={data.isLiked ? 'like_post fa fa-thumbs-up' : 'dislike_post fa fa-thumbs-up'}></i>
                        </div>
                        <div className='col-sm-4' onClick={() => comment(data._id, index, data.commentPage, 50)}>
                            {data.totalCommentWithReComment}   <i className='fa icon_class'>&#xf075;</i>

                        </div>
                        <div className='col-sm-4'>
                            <i className="fa fa-share-alt icon_class" ></i>
                        </div>
                    </div>

                </div>
                <div className='row'>
                    <div className='cmnt_row'>
                        <div className='col-sm-11 mt-3'>
                            <input type='text' placeholder='type here' className='cmnt_inpt' value={commentsState.commenting} name='commenting' onChange={(e) => handleState(e.target.name, e.target.value)}></input>
                        </div>
                        <div className='col-sm-1 mt-4' onClick={() => postComment(data._id, commentsState.commenting, index)}>
                            <i className="fa fa-send-o icon_class"></i>
                        </div>
                    </div>
                </div>
                {
                    <div className='commentList mt-4'>
                        {data.comments.map((comment, i) =>
                            <div className='row p-1 comments  mt-4 mb-4' key={i}>
                                <div className='col-sm-2'>
                                    <img className='cmnt_img' src={apiService.imagePath + comment.image}></img>
                                </div>
                                <div className='col-sm-10 comment p-2'>
                                    {comment.comment}
                                </div>
                                <div className='comnt_re'>
                                    <span onClick={() => setPostInput(i)} > reply </span>
                                    <span onClick={() => reCommentList(index, i, comment._id, data._id, comment.page)}  > view {comment.totalReComment} </span>
                                    {postInput == i && <div className='reply_input'>
                                        <input type='text'></input>
                                    </div>}
                                </div>
                                <div className='re_list'>
                                    {
                                        comment.reCommentArr.map((recmnt , j) =>
                                            <div key={j}>
                                                {recmnt.comment}
                                            </div>
                                        )
                                    }
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