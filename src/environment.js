const baseUrl = 'https://mytruck.one:1337/api/v1'
//pawan ip : 192.168.1.104
// live ip : 74.208.25.43:4000
// truck live ip : mytruck.one:1337
const apiService = {
    timeZone :baseUrl+'/timezone/list' ,
    addEvent : baseUrl+'/event/createEvent',
    posts : 'https://mytruck.one:1337/api/mobile/post/homePagePostList',
    imagePath : 'https://mytruck.one:1337/uploads/enduser/',
    postComments: 'https://mytruck.one:1337/api/mobile/comment/list',
    likePosts: 'https://mytruck.one:1337/api/mobile/like/add',
    addCommnet : 'https://mytruck.one:1337/api/mobile/comment/add',
    login :  baseUrl+'/user/login',
    tripData : baseUrl+'/trip/list',
    subCategoryList : baseUrl+'/category/subCategoryList',
    categoryList : baseUrl+'/category/list',    
    brandList : baseUrl+'/brand/list',
    productList : baseUrl+'/product/list',
    cateImgPath : 'https://mytruck.one:1337/uploads/category/thumbnail/',
    productImage : 'https://mytruck.one:1337/uploads/product/image/thumbnail_245X245/',
    addWistList : baseUrl+'/wishlist/addWishlist',
    removeWishList : baseUrl+'/wishlist/removeWishlist',
    productDetail : baseUrl+'/product/details',
    addQuestion : baseUrl+'/review/addQuestions',
    questionList : baseUrl+'/review/questionAnswerlist',
    reCommentList :  "https://mytruck.one:1337/api/mobile/comment/list",
    deletePost : "https://mytruck.one:1337/api/mobile/post/delete",
    postImagePath: 'https://mytruck.one:1337/uploads/post/image/',
    eductionsList : baseUrl+"/qualification/list",
    industryList : baseUrl+"/industry/list",
    jobList : baseUrl+"/job/list",
    companyImage : "https://mytruck.one:1337/uploads/enduser/",
    jobDetail : baseUrl+"/job/details",
    saveJob : baseUrl+"/savedjob/add"
    
}



export default apiService