let baseUrl = '' 

//  baseUrl = 'http://74.208.25.43:4000' // live

 baseUrl = "http://192.168.1.134:1337" //74





// live ip : 74.208.25.43:4000
// truck live ip : mytruck.one:1337

const apiService = {
    timeZone :baseUrl+'/api/v1/timezone/list' ,
    addEvent : baseUrl+'/api/v1/event/createEvent',
    posts :  baseUrl+'/api/mobile/post/homePagePostList',
    imagePath : 'https://mytruck.one:1337/uploads/enduser/',
    postComments: 'https://mytruck.one:1337/api/mobile/comment/list',
    likePosts: 'https://mytruck.one:1337/api/mobile/like/add',
    addCommnet : 'https://mytruck.one:1337/api/mobile/comment/add',
    login :  baseUrl+'/api/v1/user/login',
    tripData : baseUrl+'/api/v1/trip/list',
    subCategoryList : baseUrl+'/api/v1/category/subCategoryList',
    categoryList : baseUrl+'/api/v1/category/list',    
    brandList : baseUrl+'/api/v1/brand/list',
    productList : baseUrl+'/api/v1/product/list',
    cateImgPath : 'https://mytruck.one:1337/uploads/category/thumbnail/',
    productImage : 'https://mytruck.one:1337/uploads/product/image/thumbnail_245X245/',
    addWistList : baseUrl+'/api/v1/wishlist/addWishlist',
    removeWishList : baseUrl+'/api/v1/wishlist/removeWishlist',
    productDetail : baseUrl+'/api/v1/product/details',
    addQuestion : baseUrl+'/api/v1/review/addQuestions',
    questionList : baseUrl+'/api/v1/review/questionAnswerlist',
    reCommentList :  "https://mytruck.one:1337/api/mobile/comment/list",
    deletePost : "https://mytruck.one:1337/api/mobile/post/delete",
    postImagePath: 'https://mytruck.one:1337/uploads/post/image/',
    eductionsList : baseUrl+"/api/v1/qualification/list",
    industryList : baseUrl+"/api/v1/industry/list",
    jobList : baseUrl+"/api/v1/job/list",
    companyImage : "https://mytruck.one:1337/uploads/enduser/",
    jobDetail : baseUrl+"/api/v1/job/details",
    saveJob : baseUrl+"/api/v1/savedjob/add",
    removeSaveJob : baseUrl+"/api/v1/savedjob/remove",
    productDetail : baseUrl+"/api/v1/product/details"
    
}



export default apiService