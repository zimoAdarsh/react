import React, { useEffect, useState, useContext } from "react";
import Navbar from "../shared/navbar/navbar";
import './Product.css'
import apiService from '../../environment'
import axios from "axios";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { useParams } from "react-router";
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../Context";
import loadash from 'lodash'

const Product = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear())
    const [subCategory, setSubCategory] = useState('');
    const [category, setCategory] = useState(null);
    const [SubCategoryList, SetSubCategoryList] = useState([]);
    // const [brand, setBrand] = useState('');
    const [BrandList, SetBrandList] = useState([]);
    const [condition, setCondition] = useState([])
    const conditionArr = [{ condi: "New" }, { condi: "Used" }]
    const [priceValue, setPriceValue] = useState([0, 0]);
    const [yearValue, setYearValue] = useState([1990, currYear]);
    const [search, setSearch] = useState('')
    const { id } = useParams()
    const [brand, setBrand] = useState([]);
    const [productList, setProductList] = useState([])
    const [dis, setDis] = useState(false)
    const [open, setOpen] = useState(false)
    let user = useContext(UserContext)

    console.log('user==>', user)

    const handlePrice = (event, newValue) => {
        console.log(newValue)
        setPriceValue(newValue);
    };
    const handleYear = (e, value) => {
        setYearValue(value)
    }



    useEffect(() => {
        brandLists()
        subCategoryList(id)
        createCanvas()
    }, [])

    useEffect(() => {
        
        // let debouncer = loadash.debounce( () => getProductList(id), 1000 )
        debounce( getProductList(id), 2000)

        // debouncer()

    }, [priceValue, yearValue, search, brand, condition, subCategory])

    const handleChange = (event) => {
        setSubCategory(event.target.value);

    };


    const handleBrand = (event) => {
        setBrand(event.target.value);
    };
    const conditionChange = (e) => {
        if (e.target.checked) {
            condition.push(e.target.value)
            setCondition([...condition])
        } else {
            let index = condition.indexOf(e.target.value)
            condition.splice(index, 1)
            setCondition([...condition])
        }
    }


    const subCategoryList = (id) => {
        axios.post(apiService.subCategoryList, { parentCategoryId: id }).then((res) => {
            SetSubCategoryList(res.data.data)
        })
    }

    const handelClose = () => {
        setOpen(!open)
    }


    const brandLists = () => {
        axios.post(apiService.brandList, { isActive: "true", isDeleted: "false", count: 100 }).then((res) => {
            SetBrandList(res.data.data)
        })
    }


    function debounce(f, interval) {
        let timer = null;
      console.log('f, interval',f, interval)
        return (...args) => {
          clearTimeout(timer);
          return new Promise((resolve) => {
            timer = setTimeout( () => resolve(f(...args)), interval,)
          });
        };
      }

    const getProductList = (id) => {
        console.log('called===>')
        let data = {
            isActive: "true",
            isDeleted: "false",
            page: 1,
            count: 10,
            minYear: yearValue[0],
            maxYear: yearValue[1],
            categoryId: id,
            condition: condition,
            maxPrice: priceValue[1],
            minPrice: priceValue[0],
            brandId: brand,
            subCategory: subCategory,
            searchText: search,
            userId: user.user?._id

        }
        axios.post(apiService.productList, data).then((res) => {
            setProductList(res.data.data)
            console.log('res', productList)
            // setOpen( false   )
        })
    }

    const addWishList = (id, i, wish) => {
        if (wish) {
            let data = {
                productId: id,
                _id: "6253f8b195425f41cda44fd4"
            }
            setDis(true)
            axios.post(apiService.removeWishList, data).then((res) => {
                if (res['data'].code === 200) {
                    productList[i].iswishList = !wish
                    toast.success(res['data'].message)
                    setDis(false)
                    setProductList([...productList])
                } else {
                    toast.success(res['data'].message)

                    setDis(false)
                }
            }, () => {
                setDis(false)
            })
        } else {
            let data = {
                productId: id,
                userId: "6253f8b195425f41cda44fd4"
            }
            setDis(true)
            axios.post(apiService.addWistList, data).then((res) => {
                if (res['data'].code === 200) {
                    productList[i].iswishList = !wish

                    setProductList([...productList])
                    setDis(false)
                    toast.success(res['data'].message)

                } else {
                    toast.success(res['data'].message)

                    setDis(false)
                }
            }, () => {
                setDis(false)
            })
        }


    }

    const handleReset = () => {
        setSubCategory('')
        setBrand([])
        setSearch('')
        setPriceValue([0, 0])
        setYearValue([1990, currYear])
    }


    const handleBrandChange = (event) => {
        console.log('event', event)
        const { target: { value }, } = event;
        setBrand(

            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
            },
        },
    };
    const createCanvas = () => {
        let can = document.createElement('canvas')
        console.log()
    }

    return (
        <div className='products'>
            <Navbar></Navbar>

            <div className='row outter'>
                <div className='cus_ham_btn' onClick={() => handelClose()}>
                    <span className='open_close'>
                        <i class={open ? "fa fa-close slide" : "fa fa-bars "} style={{ fontSize: '24px' }}></i>

                    </span>
                </div>
                <div className={open ? "filter_list_phone" : 'd-none'} >

                    <div className='inner_filter mt-3 p-2'>
                        <div className='mt-2 mb-2 cus_filt'>
                            <h6>Filter by Keywords</h6>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className='form-control cus'></input>
                        </div>

                        {/* <div className='mt-3 mb-3 cus_filt'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Select sub-category"
                                            onChange={handleCategory}
                                        >
                                            {CategoryList.map((cate) => (
                                                <MenuItem value={cate._id} key={cate._id}>{cate.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div> */}

                        <div className='mt-3 mb-3 cus_filt'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select sub- category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Select sub-category"
                                        // onChange={ ()=>   setCategory(  ) }
                                    >
                                        {SubCategoryList.map((subCate) => (
                                            <MenuItem value={subCate._id} key={subCate._id}>{subCate.category_name} </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='mt-3 mb-3 cus_filt'>
                            {/* <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select brand</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={brand}
                                            label="Select brand"
                                            onChange={handleBrand}
                                        >
                                            {BrandList.map((brand) => (
                                                <MenuItem value={brand._id} key={brand._id}>{brand.brand} </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box> */}
                            <FormControl sx={{ m: 1, width: 260 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Brands</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={brand}
                                    // onChange={handleBrandChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}

                                >
                                    {BrandList.map((Brand) => (
                                        <MenuItem key={Brand._id} value={Brand._id}>
                                            <Checkbox checked={brand.indexOf(Brand._id) > -1} />
                                            <ListItemText primary={Brand.brand} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                        </div>
                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Condition</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            {
                                                conditionArr.map((condi) => (

                                                    <div className='col-sm-6' key={condi.condi}>
                                                        <FormGroup>
                                                            <FormControlLabel control={<Checkbox value={condi.condi} onClick={(e) => conditionChange(e)} />} label={condi.condi} />
                                                        </FormGroup>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </div>

                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Price</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <input className='form-control' value={priceValue[0]} ></input>
                                            </div>
                                            <div className='col-sm-6'>
                                                <input className='form-control' value={priceValue[1]}></input>
                                            </div>
                                            <Box sx={{ width: 300 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Price range'}
                                                    value={priceValue}
                                                    onChange={handlePrice}
                                                    min={10}
                                                    max={1000000}

                                                />
                                            </Box>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Year</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={yearValue[0]} ></input>
                                            </div>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={yearValue[1]}></input>
                                            </div>
                                            <Box sx={{ width: 300 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Year range'}
                                                    value={yearValue}
                                                    onChange={handleYear}
                                                    min={1990}
                                                    max={2022}
                                                />
                                            </Box>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className='row text-center pro_serch_filter'>
                        <div className='col-sm-6 col-6'>
                            <button className='btn btn-primary' onClick={() => getProductList(id)}>Submit</button>
                        </div>
                        <div className='col-sm-6 col-6'>
                            <button className='btn btn-danger' onClick={() => handleReset()}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-3 filter_list' >
                    <h4>Filters</h4>
                    <div className='inner_filter mt-3 p-2'>
                        <div className='mt-2 mb-2 cus_filt'>
                            <h6>Filter by Keywords</h6>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className='form-control cus'></input>
                        </div>

                        {/* <div className='mt-3 mb-3 cus_filt'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Select sub-category"
                                            onChange={handleCategory}
                                        >
                                            {CategoryList.map((cate) => (
                                                <MenuItem value={cate._id} key={cate._id}>{cate.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div> */}

                        <div className='mt-3 mb-3 cus_filt'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select sub- category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Select sub-category"
                                        onChange={handleChange}
                                    >
                                        {SubCategoryList.map((subCate) => (
                                            <MenuItem value={subCate._id} key={subCate._id}>{subCate.category_name} </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='mt-3 mb-3 cus_filt'>
                            {/* <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select brand</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={brand}
                                            label="Select brand"
                                            onChange={handleBrand}
                                        >
                                            {BrandList.map((brand) => (
                                                <MenuItem value={brand._id} key={brand._id}>{brand.brand} </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box> */}
                            <FormControl sx={{ m: 1, width: 260 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Brands</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={brand}
                                    onChange={handleBrandChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}

                                >
                                    {BrandList.map((Brand) => (
                                        <MenuItem key={Brand._id} value={Brand._id}>
                                            <Checkbox checked={brand.indexOf(Brand._id) > -1} />
                                            <ListItemText primary={Brand.brand} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                        </div>
                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Condition</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            {
                                                conditionArr.map((condi) => (

                                                    <div className='col-sm-6' key={condi.condi}>
                                                        <FormGroup>
                                                            <FormControlLabel control={<Checkbox value={condi.condi} onClick={(e) => conditionChange(e)} />} label={condi.condi} />
                                                        </FormGroup>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </div>

                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Price</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={priceValue[0]} ></input>
                                            </div>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={priceValue[1]}></input>
                                            </div>
                                            <Box sx={{ width: 300 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Price range'}
                                                    value={priceValue}
                                                    onChange={handlePrice}
                                                    min={10}
                                                    max={1000000}

                                                />
                                            </Box>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <div className='mt-2 mb-2 cus_filt'>
                            <Accordion>
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>Year</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component={'div'}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={yearValue[0]} ></input>
                                            </div>
                                            <div className='col-sm-6'>
                                                <input readOnly className='form-control' value={yearValue[1]}></input>
                                            </div>
                                            <Box sx={{ width: 300 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Year range'}
                                                    value={yearValue}
                                                    onChange={handleYear}
                                                    min={1990}
                                                    max={2022}
                                                />
                                            </Box>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className='row text-center pro_serch_filter'>
                        <div className='col-sm-6 col-6'>
                            <button className='btn btn-primary' onClick={() => getProductList(id)}>Submit</button>
                        </div>
                        <div className='col-sm-6 col-6'>
                            <button className='btn btn-danger' onClick={() => handleReset()}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className='product-list col-sm-9'>

                    <div className='row'>
                        {productList.length ? productList.map((product, i) =>
                            <div className="col-sm-6 mb-3 mt-3 m-0 p-0 res" key={i}>
                                <div className="product row mr-1 ml-1">
                                    <div className='col-sm-3'>
                                        <Link to={'/product/view/' + product._id} >
                                            <img className='pro_img w-100' src={product?.images.length ? `${apiService.productImage}${product?.images[0].name}` : '/asssets/no-product-img.jpg'} />
                                        </Link>
                                    </div>
                                    <div className="col-sm-7 pro_div">
                                        <div className='pro_name'>
                                            <h6>{product.productName}</h6>
                                        </div>

                                        <ul className='key_point p-0' >
                                            <li>{product.netWeight}lbs</li>
                                            <li>{product.productType}</li>
                                            <li>{product.productionYear}</li>
                                            <li>{product.condition}</li>
                                        </ul>
                                    </div>
                                    <div className='fav col-sm-2'  >
                                        <button disabled={dis} onClick={() => addWishList(product._id, i, product.iswishList)} className={product.iswishList ? 'far fa-heart text-danger color_red' : 'text-danger far fa-heart '}>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ) : <p className='text-center'> No record found </p>}

                        <div id='canvas'>

                        </div>
                    </div>

                </div>
            </div>

        </div>


    )

}


export default Product