import React, { useEffect, useState } from 'react'
import Product from '../Product'
import { useParams } from 'react-router'
import axios from 'axios'
import apiService from '../../../environment'
import './View.css'
import { useFormik } from 'formik'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const ProductView = () => {
    const [productData, setProductData] = useState({})
    const [value, setValue] = useState(0)
    const [quesPage, setQuesPage] = useState(1)
    const [ totalCount , setTotalCount ] = useState(5)
    const [quesCount, setQuesCount] = useState(0)
    const [questionList, setQuestionList] = useState([])
    const [dis, setDis] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let productId = useParams()

    useEffect(() => {
        questionsList(quesPage)
    }, [quesPage])

    useEffect(()=>{
        ProductDetail()
    },[])

    const ProductDetail = () => {
        let data = {
            userId: "6253f8b195425f41cda44fd4",
            _id: productId.id
        }
        axios.post(apiService.productDetail, data).then((res) => {
            if (res.data.code === 200) {
                
                setProductData(res.data.data)
                window.scrollTo({top: 0, behavior: 'smooth'});
            }

        })
    }
    const addWishList = (id, wish) => {
        if (wish) {
            let data = {
                productId: id,
                _id: "6253f8b195425f41cda44fd4"
            }
            setDis(true)
            axios.post(apiService.removeWishList, data).then((res) => {
                if (res['data'].code === 200) {
                    productData.iswishList = !wish
                    toast.success( res['data'].message )
                    setProductData({ ...productData })
                    setDis(false)
                } else {
                    toast.success( res['data'].message )
                    setDis(false)
                }
            }, () => { setDis(false) })
        } else {
            let data = {
                productId: id,
                userId: "6253f8b195425f41cda44fd4"
            }
            setDis(true)
            axios.post(apiService.addWistList, data).then((res) => {
                if (res['data'].code === 200) {
                    productData.iswishList = !wish
                    setDis(false)
                    setProductData({ ...productData })
                    toast.success( res['data'].message )
                } else {
                    toast.success( res['data'].message )
                    setDis(false)
                }
            }, () => { setDis(false) })
        }
    }

    const questionsList = (p) => {
        console.log('p==>>',p)

        let data = {
            count: totalCount,
            page: p,
            productId: productId.id,
            sellerId: "6253b0a343ee7f184918ad83",
        }
        axios.post(apiService.questionList, data).then((res) => {
            if (res['data'].code === 200) {
                setQuesCount(res['data'].totalCount)
                setQuestionList([...questionList, ...res['data'].data])
            }
            console.log('res==>', res)
        })
    }

    const pageIcre = () => {
        setQuesPage( ()=>  quesPage+1 )
        window.scroll(0,650)

    }
    const pagedre = () =>{
        // let data = questionList.splice(0 ,5)

        setQuestionList([])
        setQuesPage(1)

    }

    const formik = useFormik({
        initialValues: {
            question: ''
        },
        onSubmit: (value) => {

            let data = {
                customerId: "6253f8b195425f41cda44fd4",
                productId: productId.id,
                productName: productData.productName,
                question: value.question,
                sellerId: productData.createdById,
                userId: "6253f8b195425f41cda44fd4",
                userName: "Global Solutions"
            }
            axios.post(apiService.addQuestion, data).then((res) => {
                if (res.data.code === 200) {
                    formik.resetForm()
                }
            })
        }
    })

    return (
        <div className='product_view'>
            <div className='container'>
                <div className='row inside_view'>
                    <div className='col-sm-6'>

                    </div>
                    <div className='detail-side col-sm-6'>
                        <div className='row'>
                            <div className='col-sm-10'>
                                <h5 className='text-capitalize'>{productData.productName}</h5>
                            </div>
                            <div className='fav col-sm-2'  >
                                <button disabled={dis} onClick={() => addWishList(productData._id, productData.iswishList)} className={productData.iswishList ? 'far fa-heart text-danger color_red' : 'far fa-heart text-danger'}>

                                </button>
                            </div>

                        </div>
                        <div className='main_detail'>
                            <ul className='p-0 font_class'>
                                <li className='mt-1 mb-1'>
                                    <div> <strong>Brand</strong> : {productData.brand_name} </div>
                                </li>
                                <li className='mt-1 mb-1'>
                                    <div> <strong>Model</strong> : {productData.model_name} </div>
                                </li>
                                <li className='mt-1 mb-1'>
                                    <div> <strong>Year</strong> : {productData.productionYear} </div>
                                </li>
                                <li className='mt-1 mb-1'>
                                    <div> <strong>Condition</strong> : {productData.condition} </div>
                                </li>
                                <li className='mt-1 mb-1'>
                                    <div> <strong>Location</strong> : {productData.location} </div>
                                </li>
                            </ul>
                            <div className='contact_btn'>
                                <button className='btn_cus_contact'>
                                    Contact seller
                                </button>
                            </div>
                        </div>
                        <div className='other_details mt-4 mb-3'>
                            <h5 className='text-center'> About this item </h5>

                            <ul className='p-0' >
                                <li>
                                    <div className='mt-2'><strong>Sub Category :</strong> {productData.subCategory ? productData.subCategory : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Product Type :</strong> {productData.productType ? productData.productType : '-'}</div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Brakes :</strong> {productData.breaks ? productData.breaks : '-'}</div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Engine Make  :</strong>  {productData.engineBrand ? productData.engineBrand : '-'}</div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Engine Displacement :</strong> {productData.engineDisplacement ? productData.engineDisplacement : '-'}</div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Engine Power Output  :</strong>{productData.enginePoweroutput ? productData.enginePoweroutput : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Fuel Capacity :</strong> {productData.fuelCapacity ? productData.fuelCapacity : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Fuel Type :</strong>{productData.fuelType ? productData.fuelType : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Gross Weight :</strong>{productData.grossWeight ? productData.grossWeight : '-'} </div>
                                </li>

                                <li>
                                    <div className='mt-2'><strong>Height :</strong> {productData.height ? productData.height : '-'}</div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Width  :</strong>{productData.width ? productData.width : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Load Capacity  :</strong> {productData.loadCapacity ? productData.loadCapacity : '-'} </div>
                                </li>
                                <li>
                                    <div className='mt-2'><strong>Mileage :</strong>{productData.mileage ? productData.mileage : '-'} </div>
                                </li>  
                                <li>
                                    <div className='mt-2'><strong>Net Weight :</strong> {productData.netWeight ? productData.netWeight : '-'}</div>
                                </li>

                            </ul>
                        </div>

                    </div>
                    <div className='col-sm-12'>
                        <div className='down_sec'>
                            <h5> Have a question ?</h5>
                            <form onSubmit={formik.handleSubmit}>
                                <input className='cus_input' name='question' value={formik.values.question} onChange={formik.handleChange} />
                                {
                                    formik.values.question ?
                                        <button className='btn_cus_contact' type='submit'>
                                            Post
                                        </button> : null
                                }
                            </form>
                            <div className="mt-3">
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Customers Q&A's" {...a11yProps(0)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <div className='quesList'>
                                            {
                                                questionList.length ? questionList.map((ques , i) =>
                                                    <div className='mt-2 mb-2' key={i}>
                                                        <p className='m-0 font_class'>   <strong>Qusetion</strong> : {ques.question} </p>
                                                        <p className='m-0 font_class'>  <strong>Answer</strong> : {ques.answer}</p>

                                                    </div>
                                                ) :
                                                    <p>Be the first to ask a question.</p>
                                            }
                                        </div>
                                        <div className='see_more_less'>
                                            { questionList.length < quesCount && quesCount > totalCount ? 
                                            <span onClick={() => pageIcre()} className='see_more'> see more <i className='fas fa-angle-down'></i> </span> 
                                            : questionList.length >= quesCount && quesCount > totalCount ? <span onClick={() => pagedre()} className='see_more'> see less <i className='fas fa-angle-up'></i> </span> : null
                                            }
                                            {/* <span onClick={() => pageIcre()} className='see_more'> see less <i class='fas fa-angle-up'></i> </span> */}
                                        </div>
                                    </TabPanel>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </div >
    )

}

export default ProductView