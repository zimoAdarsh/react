import React, { useContext } from 'react'
import styled from 'styled-components'
import { BlobProvider, PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { UserContext } from "../../Context"


const Style = () => {

    const { user } = useContext(UserContext)

    console.log("invoice usre===== ", user)

    const pdf = StyleSheet.create({
        page: {
            backgroundColor: "#fff",
            fontSize : '10px',
            color: "black"
        },
        section: {
            margin: 10,
            padding: 10
        },
        viewer: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        text : {
            border : "1px solid"
        }
    })




    // style components start
    const StyleButton = styled.button`
    background: #e5dede;
    color: black;
    border: none;
    padding: 5px;
    border-radius: 7px;
    `
    const Wrapper = styled.section`
        background : #fbfbfb;
        // height : 100vh;
        display: flex;
        justify-content: space-evenly;
        position :  relative ;
        top : 100px
    `
    // style components ends

    const InvoiceData = `
        id: ${user._id},
        invoice_no: "201906-28",
        balance: "$2,283.74",
        fullname: ${user.personName},
        email: ${user.email},
        phone:  ${user.mobileNumber},
        address: "922 Campus Road, Drytown, Wisconsin, 1986",
        trans_date: "26-11-2021",
        due_date: "26-11-2021",
        companyID: "10001",
        companyName: "xyz company",
        `
    // items: [
    //     {
    //         sno: 1,
    //         desc: "FinePix Pro2 3D Camera",
    //         qty: 2,
    //         rate: 1600.00,
    //     },
    //     {
    //         sno: 2,
    //         desc: "Luxury Ultra thin Wrist Watch",
    //         qty: 1,
    //         rate: 300.99,
    //     },
    //     {
    //         sno: 3,
    //         desc: "Duracell Ultra Alkaline Battery AA, 4 pcs",
    //         qty: 1,
    //         rate: 145.99,
    //     }
    // ]
    // }
    const document = (
        <Document >
            <Page size="A4" style={pdf.page}>
                <View style={pdf.section}>
                    <Text break>{InvoiceData} </Text>
                    {/* <Text break> Welcome , to second page </Text>  */}
                </View>
            </Page>
        </Document>
    )
    const fileName = "Invoice.pdf";
    return (
        <div className='container'>
            <Wrapper>
                <StyleButton> I can create PDF </StyleButton>
                <div className='mt-5'>
                    <h4> create and view pdf </h4>
                    <div className='view_pdf'>
                        <PDFDownloadLink
                            document={document}
                            fileName={fileName}
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading..." : "Download Invoice"
                            }
                        </PDFDownloadLink>
                        <View>
                            { document }
                        </View>

                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Style