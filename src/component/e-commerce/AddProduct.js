import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./AddProduct.css"
import Constant from '../../constant';
import Navbar from '../shared/navbar/navbar';
import axios from 'axios';
import apiService from '../../environment';
import { useParams } from 'react-router-dom';

const steps = ['VIN Details', 'Vehicle Details', 'Listing Details', 'Other Detail'];

const AddProduct = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [disable, setDisable] = useState(true)
  const proId = useParams()

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formOne = useFormik({
    initialValues: Constant.forms.ecommerce.VIN,

    validationSchema: Constant.Validations.ecommerce.VIN,

    onSubmit: (values) => {
      console.log('submit 1')
      handleNext()
    }
  })

  const formTwo = useFormik({
    initialValues: Constant.forms.ecommerce.vehicle,

    validationSchema: Constant.Validations.ecommerce.vehicle,
    onSubmit: (values) => {
      console.log('submit 2')
      handleNext()
    }

  })

  const formThree = useFormik({
    initialValues: Constant.forms.ecommerce.listing,

    validationSchema: Constant.Validations.ecommerce.listing,
    onSubmit: (values) => {
      console.log('submit 3')
      handleNext()
    }

  })

  const formFour = useFormik({
    initialValues: Constant.forms.ecommerce.other,

    validationSchema: Constant.Validations.ecommerce.other,
    onSubmit: (values) => {
      // console.log('submit 4' , values)
      let data = {
        ...formOne.values,
        ...formTwo.values,
        ...formThree.values,
        ...formFour.values
      }
      handleNext()

      console.log('data===', data)

    }
  })

  const getProductDetails = () => {
    axios.post(apiService.productDetail, { _id: proId.id }).then((res) => {
      if (res.data.code === 200) {

        for (let one in formOne.values) {
          formOne.setFieldValue(one, res.data.data[one])
        }
        for (let two in formTwo.values) {
          formTwo.setFieldValue({two : res.data.data[two]})
        }
        for (let three in formThree.values) {
          formThree.setFieldValue(three, res.data.data[three])
        }
        for (let four in formFour.values) {
          formFour.setFieldValue(four, res.data.data[four])
        }

      }
      console.log("======res", res.data.data)
    })

  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const formValid = (type) => {

    switch (type) {
      case 0:
        return formOne

      case 1:
        return formTwo

      case 2:
        return formThree

      case 3:
        return formFour

    }

  }


  return <>
    <Navbar></Navbar>
    <div className='container'>
      <div className='row mt-3 mb-3'>
        <div className='col-sm-12 heading text-center'>
          <h2 className='text-light'> Add Product </h2>
        </div>
      </div>
      <div className='form '>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                // labelProps.optional = (
                //   <Typography variant="caption">Optional</Typography>
                // );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>

              {activeStep === 0 &&
                <div className='form_vin row mt-3 ml-3'>
                  <form >
                    <div className='col-sm-12 '>
                      <label>VIN :</label>
                      <input type='text' className='form-control' name='vin' placeholder='enter vin' value={formOne.values.vin} onChange={formOne.handleChange} onBlur={formOne.handleBlur}></input>
                      {formOne.touched.vin && formOne.errors.vin ? <small className='error_class' >{formOne.errors.vin}</small> : null}
                    </div>
                  </form>
                </div>
              }
              {activeStep === 1 &&
                <div className='form_vin  mt-3 '>
                  <form className='row'>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Brand :</label>
                      <input type='text' className='form-control' name='brandId' placeholder='enter brand' value={formTwo.values.brandId} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.brandId && formTwo.errors.brandId ? <small className='error_class' >{formTwo.errors.brandId}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Model :</label>
                      <input type='text' className='form-control' name='modelId' placeholder='enter modelId' value={formTwo.values.modelId} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.modelId && formTwo.errors.modelId ? <small className='error_class' >{formTwo.errors.modelId}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Year of Production :</label>
                      <input type='text' className='form-control' name='productionYear' placeholder='enter productionYear' value={formTwo.values.productionYear} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.productionYear && formTwo.errors.productionYear ? <small className='error_class' >{formTwo.errors.productionYear}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Engine Make :</label>
                      <input type='text' className='form-control' name='engineBrand' placeholder='enter engineBrand' value={formTwo.values.engineBrand} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.engineBrand && formTwo.errors.engineBrand ? <small className='error_class' >{formTwo.errors.engineBrand}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Brakes :</label>
                      <input type='text' className='form-control' name='breaks' placeholder='enter breaks' value={formTwo.values.breaks} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.breaks && formTwo.errors.breaks ? <small className='error_class' >{formTwo.errors.breaks}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Fuel Type :</label>
                      <input type='text' className='form-control' name='fuelType' placeholder='enter fuelType' value={formTwo.values.fuelType} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.fuelType && formTwo.errors.fuelType ? <small className='error_class' >{formTwo.errors.fuelType}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Engine Power Output:</label>
                      <input type='text' className='form-control' name='enginePoweroutput' placeholder='enter enginePoweroutput' value={formTwo.values.enginePoweroutput} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.enginePoweroutput && formTwo.errors.enginePoweroutput ? <small className='error_class' >{formTwo.errors.enginePoweroutput}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Engine Displacement:</label>
                      <input type='text' className='form-control' name='engineDisplacement' placeholder='enter engineDisplacement' value={formTwo.values.engineDisplacement} onChange={formTwo.handleChange} onBlur={formTwo.handleBlur}></input>
                      {formTwo.touched?.engineDisplacement && formTwo.errors.engineDisplacement ? <small className='error_class' >{formTwo.errors.engineDisplacement}</small> : null}
                    </div>
                  </form>
                </div>
              }
              {activeStep === 2 &&
                <div className='form_vin  mt-3 '>
                  <form className='row'>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Product Name :</label>
                      <input type='text' className='form-control' name='productName' placeholder='enter product name' value={formThree.values.productName} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.productName && formThree.errors.productName ? <small className='error_class' >{formThree.errors.productName}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Subcategory :</label>
                      <input type='text' className='form-control' name='subCategoryId' placeholder='enter subCategoryId' value={formThree.values.subCategoryId} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.subCategoryId && formThree.errors.subCategoryId ? <small className='error_class' >{formThree.errors.subCategoryId}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Product Type :</label>
                      <input type='text' className='form-control' name='productType' placeholder='enter productType' value={formThree.values.productType} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.productType && formThree.errors.productType ? <small className='error_class' >{formThree.errors.productType}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Condition :</label>
                      <input type='text' className='form-control' name='condition' placeholder='enter condition' value={formThree.values.condition} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.condition && formThree.errors.condition ? <small className='error_class' >{formThree.errors.condition}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>noOfMiles :</label>
                      <input type='text' className='form-control' name='noOfMiles' placeholder='enter noOfMiles' value={formThree.values.noOfMiles} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.noOfMiles && formThree.errors.noOfMiles ? <small className='error_class' >{formThree.errors.noOfMiles}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Engine Hours :</label>
                      <input type='text' className='form-control' name='engineHours' placeholder='enter engineHours' value={formThree.values.engineHours} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.engineHours && formThree.errors.engineHours ? <small className='error_class' >{formThree.errors.engineHours}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Location:</label>
                      <input type='text' className='form-control' name='location' placeholder='enter location' value={formThree.values.location} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.location && formThree.errors.location ? <small className='error_class' >{formThree.errors.location}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Currency:</label>
                      <input type='text' className='form-control' name='currency' placeholder='enter currency' value={formThree.values.currency} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.currency && formThree.errors.currency ? <small className='error_class' >{formThree.errors.currency}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Price:</label>
                      <input type='text' className='form-control' name='price' placeholder='enter price' value={formThree.values.price} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.price && formThree.errors.price ? <small className='error_class' >{formThree.errors.price}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Description:</label>
                      <input type='text' className='form-control' name='description' placeholder='enter description' value={formThree.values.description} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.description && formThree.errors.description ? <small className='error_class' >{formThree.errors.description}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>ListingType:</label>
                      <input type='text' className='form-control' name='listingType' placeholder='enter listingType' value={formThree.values.listingType} onChange={formThree.handleChange} onBlur={formThree.handleBlur}></input>
                      {formThree.touched.listingType && formThree.errors.listingType ? <small className='error_class' >{formThree.errors.listingType}</small> : null}
                    </div>
                  </form>
                </div>
              }
              {activeStep === 3 &&
                <div className='form_vin  mt-3 '>
                  <form className='row'>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Color :</label>
                      <input type='text' className='form-control' name='color' placeholder='enter product name' value={formFour.values.color} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.color && formFour.errors.color ? <small className='error_class' >{formFour.errors.color}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Width :</label>
                      <input type='text' className='form-control' name='width' placeholder='enter width' value={formFour.values.width} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.width && formFour.errors.width ? <small className='error_class' >{formFour.errors.width}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Height :</label>
                      <input type='text' className='form-control' name='height' placeholder='enter height' value={formFour.values.height} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.height && formFour.errors.height ? <small className='error_class' >{formFour.errors.height}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Mileage :</label>
                      <input type='text' className='form-control' name='mileage' placeholder='enter mileage' value={formFour.values.mileage} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.mileage && formFour.errors.mileage ? <small className='error_class' >{formFour.errors.mileage}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Suspension :</label>
                      <input type='text' className='form-control' name='suspension' placeholder='enter suspension' value={formFour.values.suspension} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.suspension && formFour.errors.suspension ? <small className='error_class' >{formFour.errors.suspension}</small> : null}
                    </div>

                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Transmission Type :</label>
                      <input type='text' className='form-control' name='transmissionType' placeholder='enter transmissionType' value={formFour.values.transmissionType} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.transmissionType && formFour.errors.transmissionType ? <small className='error_class' >{formFour.errors.transmissionType}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>wheelBase:</label>
                      <input type='text' className='form-control' name='wheelBase' placeholder='enter wheelBase' value={formFour.values.wheelBase} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.wheelBase && formFour.errors.wheelBase ? <small className='error_class' >{formFour.errors.wheelBase}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Net Weight:</label>
                      <input type='text' className='form-control' name='netWeight' placeholder='enter netWeight' value={formFour.values.netWeight} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.netWeight && formFour.errors.netWeight ? <small className='error_class' >{formFour.errors.netWeight}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Gross Weight:</label>
                      <input type='text' className='form-control' name='grossWeight' placeholder='enter grossWeight' value={formFour.values.grossWeight} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.grossWeight && formFour.errors.grossWeight ? <small className='error_class' >{formFour.errors.grossWeight}</small> : null}
                    </div>
                    <div className='col-sm-6 mt-1 mb-1 '>
                      <label>Load Capacity:</label>
                      <input type='text' className='form-control' name='loadCapacity' placeholder='enter loadCapacity' value={formFour.values.loadCapacity} onChange={formFour.handleChange} onBlur={formFour.handleBlur}></input>
                      {formFour.touched.loadCapacity && formFour.errors.loadCapacity ? <small className='error_class' >{formFour.errors.loadCapacity}</small> : null}
                    </div>
                  </form>
                </div>

              }

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={() => formValid(activeStep).handleSubmit()} type='submit' >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  </>


}

export default AddProduct