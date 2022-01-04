const baseUrl = 'http://74.208.25.43:4000/api/v1'

const apiService = {
    timeZone :baseUrl+'/timezone/list' ,
    addEvent : baseUrl+'/event/createEvent',
    posts : 'http://74.208.25.43:4000/api/mobile/post/homePagePostList',
    imagePath : 'http://74.208.25.43:4000/uploads/enduser/',
    postComments: 'http://74.208.25.43:4000/api/mobile/comment/list',
    likePosts: 'http://74.208.25.43:4000/api/mobile/like/add',
    addCommnet : 'http://74.208.25.43:4000/api/mobile/comment/add',
    login :  baseUrl+'/user/login',
    tripData : baseUrl+'/trip/list'
}

export default apiService