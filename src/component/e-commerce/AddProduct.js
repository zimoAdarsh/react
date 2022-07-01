import React, { useState } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./AddProduct.css"
import Constant from '../../constant';
import * as Yup from "yup"


const steps = ['VIN Details', 'Vehicle Details', 'Listing Details', 'Other Detail', 'Upload Images'];

const AddProduct = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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

  const formik = useFormik({
    initialValues: {
      formOne: Constant.forms.ecommerce.VIN,
      formTwo: Constant.forms.ecommerce.vehicle,
      formThree: Constant.forms.ecommerce.listing,
      formFour: Constant.forms.ecommerce.other
    },
    validationSchema: Yup.object({

      formOne: Constant.Validations.ecommerce.VIN,
      formTwo: Constant.Validations.ecommerce.vehicle,
      formThree: Constant.Validations.ecommerce.listing,
      formFour: Constant.Validations.ecommerce.other

    }),
    onSubmit: (values) => {

      console.log(values)
    }
  })

  const formValid = (type) => {

    switch (type) {
      case 0:
        return formik.values.formOne
      case 1:
        return formik.values.formTwo
      case 2:
        return formik.values.formThree
      case 3:
        return formik.values.formFour
    }
  }


  return <>
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
                All steps completed - you&apos;re finished
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
                      <input type='text' className='form-control' name='formOne.vin' placeholder='enter vin' value={formik.values.formOne.vin} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                      {formik.touched.formOne?.vin && formik.errors.formOne?.vin ? <small className='error_class' >{formik.errors.formOne?.vin}</small> : null}
                    </div>
                  </form>
                </div>




              }
              {activeStep === 1 && <h5> form two </h5>}
              {activeStep === 2 && <h5> form three </h5>}







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
                <Button onClick={handleNext} type='submit' onClickCapture={ console.log(formValid( activeStep -1 )) }>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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