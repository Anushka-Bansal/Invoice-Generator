import React, { useState,useEffect } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import Navs from "./Navs";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
// import Pdf from "react-to-pdf";
import { useNavigate } from "react-router-dom";
import { getInvoice,sendMail} from "../Config/Myservices";
// const ref= React.createRef();

export default function GeneratePDF() {
    let total =[0];
    const [Items,setItems] = useState([]);
    const [state,setState] = useState([]);
    const navigate = useNavigate();
    let id = JSON.parse(localStorage.getItem("invoicenumber"));
    useEffect(() => {
        getInvoice().then((res) => {
            console.log(id);
            const match = res.data.filter((data) => {
                console.log(id);
                console.log(data.innumber);
                if (data.innumber === id) {
                    console.log(data);
                    let product = [];
                    data.items.forEach((ele) => {
                        product.push(ele);
                    });
                    setItems(product);
                    return data;
                }
            });
            setState(match);
        });
    }, []);

    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            alert("PDF is generated");
            pdf.save("download.pdf");
        });
    };

    const sendmail = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            alert("Mail sent !!!");
            sendMail(formData).then((res) => {
                console.log(res);
            });
        });
    };

    return (
        <div>
            <Navs />
            <br />
            <Container>
                <div className="text-center">
                {/* <Pdf targetRef={ref} filename="invoice.pdf">
                    {({ toPdf }) => <Button variant="success" style={{marginRight:'1%'}} onClick={toPdf}>Generate PDF</Button>}
                </Pdf> */}
                    <Button variant="success" onClick={()=>generatePdf()}>Generate PDF</Button> &nbsp;
                    <Button variant="primary" onClick={()=>sendmail()}>Send via Email</Button>
                </div>
            </Container>
            <br />
            <Container style={{ border: "1px solid black", width: "800px" }} id="divToPrint">
                <div >
                    <Row>
                        <Col md={3}>
                            <div>
                                <Image src="./images/logo.jpg" width="100px" height="100px"/>
                            </div>
                        </Col>
                        <Col md={9}>
                            <h2 style={{textAlign:"right",padding:"20px"}}>Invoice</h2>
                            <p style={{textAlign:"right",paddingRight:"20px"}}>Number : {id}</p>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Row>
                        <Col md={3}>
                            <p className="text-left pl-5">
                                <span style={{fontWeight: "bold",color: "gray"}}>FROM</span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>Hedge Interiors and Decors</span>
                                <br />
                                hedge@hellocors.com
                                <br />
                                9876543210
                            </p>
                            <br />
                            <p className="text-left pl-5" >
                                <span style={{fontWeight: "bold",color: "gray"}}>BILL TO</span>
                                <br />
                                {state.map((value,index)=>{
                                    return (
                                        <>
                                         <span style={{ fontWeight: "bold" }}>{value.recname}</span><br/>
                                        {value.recemail}
                                        <br/>
                                        {value.reccontact}
                                        <br />
                                        {value.recaddress}
                                        </>
                                    )
                                })}
                            </p>
                        </Col>
                        <Col md={9}>
                            <p className="text-right pr-5">
                                <span style={{fontWeight: "bold",color: "gray"}}>STATUS</span>
                                <br />
                                <span style={{ fontWeight: "bold",color:"red" }}>Unpaid</span>
                                <br />
                            </p>
                            {state.map((value,index)=>{
                                return (
                                    <>
                                        <p className="text-right pr-5">
                                            <span style={{fontWeight: "bold",color: "gray"}}>DATE</span>
                                            <br />
                                            
                                            <span style={{ fontWeight: "bold" }}>{value.indate}</span>
                                            <br />
                                        </p>
                                        <p className="text-right pr-5">
                                            <span style={{fontWeight: "bold",color: "gray"}}>DUE DATE</span>
                                            <br />
                                                    <span style={{ fontWeight: "bold" }}>{value.duedate}</span>
                                                    <br />
                                        </p>
                                        <p className="text-right pr-5">
                                            <span style={{fontWeight: "bold",color: "gray"}}>AMOUNT</span>
                                            <br />
                                            <span style={{ fontWeight: "bold" }} className="display-4">{value.total}</span>
                                            <br />
                                        </p>
                                    </>
                                    )
                                })}
                                    
                            
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Disc(%)</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Items.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.price}</td>
                                    <td>{value.discount}</td>
                                    <td>{((value.price - (value.price * value.discount / 100)) * value.quantity)}</td>
                                </tr>
                            );
                        })}             
                        </tbody>
                    </Table>
                </div>
                <div>
                    <span style={{ fontWeight: "bold" }}>Payment Terms:</span>
                    <br />
                    Please pay the amount within due date.
                </div>
                <br />
            </Container>
        </div>
    );
}
