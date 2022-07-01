import axios from "axios";
import React, { useEffect, useState } from 'react'
import Navbar from "../shared/navbar/navbar";
import './home.css'
import Post from "../post/post";
import apiService from '../../environment'
import { toast } from "react-toastify";
import { UserContext } from "../../Context";
import { useContext } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Menu from "../menu/menu";

function Home() {
    const [postsData, setPostsData] = useState([])
    const [stop, setStop] = useState(true)
    const [open, setOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [loadMore, setLoadMore] = useState(false)

    let { user } = useContext(UserContext)

    console.log('context_i', user)

    const loadFunc = () => {
        console.log('load more==>')
    }

    const pageChange = () => {
        setPage(() => page + 1)
    }


    useEffect(() => {
        if (Object.keys(user).length) getPostList()
    }, [(Object.keys(user).length), page])

    const getPostList = () => {
        let data = {
            count: 5,
            page: page,
            userId: user._id
        }
        axios.post(apiService.posts, data).then((res) => {
            if (res.data.code === 200) {

                if (res.data.totalCount) {
                    setPostsData([...res.data.data])
                    setTotalCount(res.data.totalCount)

                    let totalPages = Math.ceil(res.data.totalCount) / 10

                    if (page < totalPages) setLoadMore(true)
                }
                console.log('res=>>>', res.data)
            }

        })
    }

    const commentList = async (Id, index, page, count) => {
        if (postsData[index].totalComment > postsData[index].comments.length && stop) {
            setStop(false)
            const comments = await axios.post(apiService.postComments, { postId: Id, page: page, count: count, userId: user._id })
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
        const likeData = await axios.post(apiService.likePosts, { userId: user._id, postId: postId, isActive: active, liked: true })
        postsData[index].isLiked = likeData['data'].data.isLiked
        setPostsData([...postsData])
    }

    const addComment = async (postId, cmnt, index) => {
        let data = {
            comment: cmnt,
            postId: postId,
            userId: user._id,
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
                userId: user._id,
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

    const commentReplyList = (postI, cmntI, cmntId, postId, page) => {
        let data = {
            commentId: cmntId,
            count: 50,
            page: page,
            postId: postId,
            userId: user._id,
        }

        axios.post(apiService.reCommentList, data).then((res) => {
            console.log('recomment==>', res)
            postsData[postI].comments[cmntI].page++
            postsData[postI].comments[cmntI].reCommentArr.push(...res.data.data)
            setPostsData([...postsData])
        })
    }
    const handleClopen = () => {
        setOpen(!open);
        console.log('open==>>')
    }


    const clicked = (i) => {
        console.log('post=>>', i)
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
            <div className="container">
            </div>
            <div className='container'>
                <div className='heading'>
                    {/* <h5>Post List</h5> */}
              {/* <Menu></Menu> */}
                </div>
                <div className='post_list'>
                    {/* {loadMore ? 'Yes' : 'NO'} */}
                    {/* <InfiniteScroll
                        pageStart={0}
                        loadMore={() => {
                            getPostList()
                            pageChange()
                        }}
                        hasMore={loadMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        useWindow={true}
                    > */}
                        {postsData.map((post, index) =>
                            <Post data={post}
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
                    {/* </InfiniteScroll> */}


                </div>
            </div>
        </div>

    )
}

export default Home