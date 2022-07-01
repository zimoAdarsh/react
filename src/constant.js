import * as Yup from "yup"

const Constant = {
    itemsPerPage: 5,
    MAP_API_KEY: "AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s",



    forms: {
        ecommerce: {
            VIN: {
                vin: ""
            },
            vehicle: {
                brandId: "",
                modelId: "",
                productionYear: "",
                engineBrand: "",
                fuelType: "",
                breaks: "",
                enginePoweroutput: "",
                engineDisplacement: ""
            },
            listing: {
                productName: "",
                subCategoryId: "",
                productType: "",
                condition: "",
                noOfMiles: "",
                engineHours: "",
                location: "",
                currency: "",
                price: "",
                description: "",
            },
            other: {
                color: "",
                width: "",
                height: "",
                mileage: "",
                suspension: "",
                transmissionType: "",
                fuelCapacity: "",
                wheelBase: "",
                netWeight: "",
                grossWeight: "",
                loadCapacity: "",
            }
        }
    },


    Validations: {
        ecommerce: {
            VIN: Yup.object({ vin: Yup.string().required("vin is required") }),
            vehicle: Yup.object({
                brandId: Yup.string().required("brandId is required"),
                modelId: Yup.string().required("modelId is required"),
                productionYear: Yup.number().required("prouduction year is required"),
                engineBrand: Yup.string().required("engine brand is required"),
                fuelType: Yup.string().required("fuel type is required"),
                breaks: Yup.string().required("brakes is required"),
                enginePoweroutput: Yup.string().required("power output is required"),
                engineDisplacement: Yup.string().required("displacement is required")
            }),
            listing: Yup.object({
                productName: Yup.string().required("product name is required"),
                subCategoryId: Yup.string().required("subcategory is required"),
                productType: Yup.string().required("product type is required"),
                condition: Yup.string().required("condition is required"),
                noOfMiles: Yup.string().required("number of miles is required"),
                engineHours: Yup.string().required("engine hours are required"),
                location: Yup.string().required("location is required"),
                currency: Yup.string().required("currency is required"),
                price: Yup.string().required("price is required"),
                description: Yup.string().required("description is required"),
            }),
            other: Yup.object({
                color: Yup.string().required("color is required"),
                width: Yup.string().required("width is required"),
                height: Yup.string().required("height is required"),
                mileage: Yup.string().required("mileage is required"),
                suspension: Yup.string().required("suspension is required"),
                transmissionType: Yup.string().required("transmission type is required"),
                fuelCapacity: Yup.string().required("fuel capacity is required"),
                wheelBase: Yup.string().required("wheelbase is required"),
                netWeight: Yup.string().required("net weight is required"),
                grossWeight: Yup.string().required("gross weight is required"),
                loadCapacity: Yup.string().required("load capcity is required"),
            })
        }
    }




}

export default Constant