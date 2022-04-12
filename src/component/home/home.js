import axios from "axios";
import React, { useEffect, useState } from 'react'
import Navbar from "../shared/navbar/navbar";
import './home.css'
import Post from "../post/post";
import apiService from '../../environment'
function Home() {
    const [postsData , setPostsData] = useState([])
    const [ commentData , setCommentData] = useState('')
    useEffect(() => {
        const getPostList = async () => {
            let data = {
                count: 10,
                page: 1,
                userId: "61a84b567410aec83e4266df"
            }
            const postList = await axios.post(apiService.posts,data)
            setPostsData(postList.data.data)
        }

        getPostList()
    }, [])

    const commentList = async (Id ,index,page,count) => {        
        if(postsData[index].totalComment !==  postsData[index].comments.length){
            const paga = page === 1? page :paga +1
        const comments = await axios.post(apiService.postComments, { postId: Id ,page:paga,count:count})
        setCommentData(comments.data)
        console.log("comments.data.data",postsData[index].totalComment, postsData[index].comments.length)
        // console.log('postsData[index].comments.length', commentData)
        postsData[index].comments.push(...comments.data.data)
        setPostsData([...postsData])
        }
    }

    const likePost= async(postId,active,index)=>{
        const likeData = await axios.post( apiService.likePosts,{userId: "61a84b567410aec83e4266df",postId:postId,isActive:!active,liked:true})
        console.log('postsData[index]',likeData.data.data)
        postsData[index] = {...likeData.data.data}
        setPostsData([...postsData])
    }
    const addComment = async(comment , id)=>{
        const addComment = await axios.post(apiService.addCommnet,{userId: "61c4365d1fc8437939cb177b",postId:id,comment:comment})
        console.log('addComment',addComment)
    }



    return (
        <div className='home'>
            <Navbar></Navbar>
            <div className='container'>
                <div className='heading'>
                    {/* <h5>Post List</h5> */}
                </div>
                <div className='post_list'>
                {postsData.map( (post,index )=><Post data={post} comment={commentList} index={index} like={likePost} postComment ={addComment} />)
                
                }
                    
                </div>
            </div>
        </div>

    )
}

export default Home