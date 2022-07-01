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
    const [toggle, setToggle] = useState(true)

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
            <div className='row post_header p-1' >
                <div className='col-sm-2 col-2'>
                    <img className='avatar' src={apiService.imagePath + data.userData?.image}></img>
                </div>
                <div className='col-sm-7 col-7'>
                    <p className='m-0'>{data.userData.personName}</p >
                    <span className='posted_at'>{data.postedAt}</span>
                </div>
                <div className='col-sm-3 col-3 text-center'>
                    <i className="fa fa-ellipsis-v" onClick={() => toggleClass()}></i>
                    <div className={classIn ? 'list' : 'no_list'}>
                        <ul className='cus_menu'>
                            <li onClick={() => { deletePost(index); toggleClass() }} > Delete </li>
                            {/* {isOpen && <DialogBox functions={() => deletePost(data._id, index)} content={content} handelopen={setOpen} open={isOpen} ></DialogBox>} */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row m-0 g-0 p-0'>
                <div className='col-sm-12 mt-1 mb-2 post_data'>
                    <p className='caption'>
                        {
                            <div >
                                <p className={data.caption.length > 30 && toggle ? "cap_hide p-1" : "p-1"} dangerouslySetInnerHTML={{ __html: data.caption }}></p>

                                {data.caption.length > 130 && toggle ? <p className="toggle" onClick={() => setToggle(!toggle)} style={{ cursor: "pointer" }} >see more</p> : ''}
                            </div>
                        }
                    </p>
                    <div className='post_media'>
                        {data.media.length > 0 && <img className="w-100" src={apiService.postImagePath + data.media[0]?.name}></img>}
                    </div>

                </div>
            </div>
            <div className='row '>
                <div className='actions text-center'>
                    <div className='col-sm-3 text-center' onClick={() => like(data._id, !data.isLiked, index)}>
                        <i style={{ fontSize: "24px", cursor: 'pointer' }} className={data.isLiked ? 'like_post fa fa-thumbs-up' : 'dislike_post fa fa-thumbs-up'}></i>
                    </div>
                    <div className='col-sm-3 text-center' onClick={() => comment(data._id, index, data.commentPage, 50)}>
                        {data.totalCommentWithReComment}   <i className='fa icon_class'>&#xf075;</i>

                    </div>
                    <div className='col-sm-3 text-center'>
                        <i className="fa fa-share-alt icon_class" ></i>
                    </div>
                </div>

            </div>
            <div className='row'>
                <div className='cmnt_row'>
                    <div className='col-sm-11 mt-3 text-center'>
                        <input type='text' placeholder='type here' className='cmnt_inpt' value={commentsState.commenting} name='commenting' onChange={(e) => handleState(e.target.name, e.target.value)}></input>
                    </div>
                    <div className='col-sm-1 mt-4' onClick={() => postComment(data._id, commentsState.commenting, index)}>
                        <i className="fa fa-send-o icon_class"></i>
                    </div>
                </div>
            </div>
            {
                // <div className='commentList mt-4'>
                <>
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
                                    <input type='text' className='rp_int'></input>
                                </div>}
                            </div>
                            <div className='re_list'>
                                {
                                    comment.reCommentArr.map((recmnt, j) =>
                                        <div key={j}>
                                            {recmnt.comment}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </>

            }




        </div>
    )
}

export default Post