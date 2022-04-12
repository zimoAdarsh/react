const baseUrl = 'https://mytruck.one:1337/api/v1'
//pawan ip : 192.168.1.104
// live ip : 74.208.25.43:4000
// truck live ip : mytruck.one:1337
const apiService = {
    timeZone :baseUrl+'/timezone/list' ,
    addEvent : baseUrl+'/event/createEvent',
    posts : 'http://192.168.1.129:1399/api/mobile/post/homePagePostList',
    imagePath : 'http://192.168.1.129:1399/uploads/enduser/',
    postComments: 'http://192.168.1.129:1399/api/mobile/comment/list',
    likePosts: 'http://192.168.1.129:1399/api/mobile/like/add',
    addCommnet : 'http://192.168.1.129:1399/api/mobile/comment/add',
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
    questionList : baseUrl+'/review/questionAnswerlist'

    
}

export default apiService