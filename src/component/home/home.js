import axios from "axios";
import React, { useEffect, useState } from 'react'
import Navbar from "../shared/navbar/navbar";
import './home.css'
import Post from "../post/post";
import apiService from '../../environment'
import { toast } from "react-toastify";
function Home() {
    const [postsData, setPostsData] = useState([])
    const [stop, setStop] = useState(true)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getPostList()
    }, [])

    const getPostList = async () => {
        let data = {
            count: 10,
            page: 1,
            userId: "624fcfb1bc86d15538faf61a"
        }
        const postList = await axios.post(apiService.posts, data)
        setPostsData(postList.data.data)
    }

    const commentList = async (Id, index, page, count) => {
        if (postsData[index].totalComment > postsData[index].comments.length && stop) {
            setStop(false)
            const comments = await axios.post(apiService.postComments, { postId: Id, page: page, count: count, userId: "6253f8b195425f41cda44fd4" })
            if (comments.data.code === 200) {
                postsData[index].commentPage++
                postsData[index].comments.push(...comments.data.data)
                setPostsData([...postsData])
                setStop(true)
            } else {
                toast.error('error')
                setStop(true)
            }


        }
    }

    const likePost = async (postId, active, index) => {
        const likeData = await axios.post(apiService.likePosts, { userId: "6253f8b195425f41cda44fd4", postId: postId, isActive: active, liked: true })
        postsData[index].isLiked = likeData['data'].data.isLiked
        setPostsData([...postsData])
    }

    const addComment = async (postId, cmnt, index) => {
        let data = {
            comment: cmnt,
            postId: postId,
            userId: "6253f8b195425f41cda44fd4",
            userImage: "a802b7c4-0dbf-4a48-b7b2-8f0ace6b50d6-1649675168171_caucasian-trucker-driver-in-front-of-his-retro-sem-2021-08-29-11-42-50-utc.jpeg",
            userName: "Global Solutions",
        }
        if (!cmnt) return
        const addComment = await axios.post(apiService.addCommnet, data)
        if (addComment['data'].code === 200) {
            let push = {
                comment: cmnt,
                image: "a802b7c4-0dbf-4a48-b7b2-8f0ace6b50d6-1649675168171_caucasian-trucker-driver-in-front-of-his-retro-sem-2021-08-29-11-42-50-utc.jpeg",
                personName: "Global Solutions",
                userId: "6253f8b195425f41cda44fd4",
                _id: addComment['data'].data._id,
                isEdited: false,
                isMyComment: true,
                reCommentArr: [],
                totalReComment: 0
            }
            postsData[index].totalCommentWithReComment++
            postsData[index].comments.unshift(push)
            setPostsData([...postsData])
            cmnt = null
        }
        console.log('addComment', addComment)
    }

    const commentReplyList = (postI, i, cmntId, postId, page) => {
        let data = {
            commentId: cmntId,
            count: 50,
            page: page,
            postId: postId,
            userId: "6253f8b195425f41cda44fd4",
        }

        axios.post(apiService.reCommentList, data).then((res) => {
            console.log('recomment==>', res)
            postsData[postI].comments[i].page++
            postsData[postI].comments[i].reCommentArr.push(...res.data.data)
            setPostsData([...postsData])
        })
    }
    const handleClopen = () => {
        setOpen(!open);
        console.log('open==>>')
    }


    const clicked = (i) => {
        console.log('post=>>' ,i)
        postsData.splice(i, 1)
        setPostsData([...postsData])
        setOpen(false)
        // axios.post(apiService.deletePost, { postId: post, userId: "" }).then((res) => {


        // if (res.data.code === 200) {

        // } else {
        //     toast.error(res.data.message)
        // }

        // })
    }



    return (
        <div className='home'>
            <Navbar></Navbar>
            <div className='container'>
                <div className='heading'>
                    {/* <h5>Post List</h5> */}
                </div>
                <div className='post_list'>
                    {postsData.map((post, index) => <Post data={post}
                        comment={commentList}
                        index={index}
                        like={likePost}
                        postComment={addComment}
                        reCommentList={commentReplyList}
                        deletePost={clicked}
                        setOpen={handleClopen}
                        isOpen={open}
                    />)

                    }

                </div>
            </div>
        </div>

    )
}

export default Home