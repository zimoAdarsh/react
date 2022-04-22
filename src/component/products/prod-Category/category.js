import React, { useState, useEffect } from "react";
import apiService from "../../../environment";
import axios from "axios";
import './category.css'
import { useNavigate } from "react-router";
const ProductCategory = () => {
    const navigate = useNavigate()
    const [CategoryList, SetCategoryList] = useState([]);

    useEffect(() => {
        categoryList()
    }, [])

    const categoryList = () => {
        axios.post(apiService.categoryList, { parentFlag: "true" }).then((res) => {
            SetCategoryList(res.data.data)
        })
    }

    const handlePath=(cat)=>{
        if (cat.constant_name ==="ACCESSORIES" ||cat.constant_name === "SPAREPARTS")
        {
            return
        } 
        else{
            navigate('/products/'+cat._id)
        }
    }
    return (
        <div className='prod_category mt-5'>
            <div className='container'>
                <div className='row'>
                    <div className='category_head col-sm-12'>
                        <h6 className="heading">
                            <strong>What deal are you interested in?</strong>
                        </h6>
                    </div>
                    <div className='row'>
                        {CategoryList.map((cate) => (
                            <div className='cate_row col-sm-2 col-xs-6' key={cate._id} >
                                <div className="cus_img mt-3" onClick={()=> handlePath(cate) }>
                                        <img className='cate_img' src={`${apiService.cateImgPath}${cate.image}`}></img>
                                </div>
                                <strong className='mt-3'>{cate.category_name}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCategory

