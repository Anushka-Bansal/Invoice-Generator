import React, { useState, useEffect } from "react";
import {Button,Card,Col,Container,Form,Row,Table,} from "react-bootstrap";
import Navs from "./Navs";
import {useNavigate} from "react-router";
import { addInvoice } from "../Config/Myservices";

export default function Invoice() {
    let total =[0];
    const [items, setItems] = useState([]);
    const navigate=useNavigate();
    const [product, setProduct] = useState({
        title: "",
        quantity: "",
        price: "",
        discount: "",
    });
    const [data, setData] = useState({
        innumber: "",
        recname: "",
        recaddress: "",
        reccontact:"",
        recemail:"",
        status:"",
        indate: "",
        duedate: "",
        total:"",
        items: "",
    });
    console.log(new Date().toLocaleDateString());
    let date = new Date().toLocaleDateString();

    useEffect(() => {
        let abc = JSON.parse(localStorage.getItem("products"));
        setItems(abc);
    }, []);

    const handleProducts = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };
    console.log(product);
    const handler = (event) => {
        const { name, value } = event.target;
        let invoicedate = document.getElementById("invoicedate").value;
        setData({ ...data, indate: invoicedate, [name]: value,
             items: items,status:"unpaid",total: total.reduce((result,num) => result + num)});
    };
    console.log(data);

    const invoiceAdd = (event) => {
        event.preventDefault();
        addInvoice(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("invoicenumber",res.data.invoicenumber);
                alert(res.data.message);
                navigate('/generate');
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
        localStorage.removeItem("products");
    };

    const productSubmit = (event) => {
        // event.preventDefault();
        if (localStorage.getItem("products") !== null) {
            let arr = JSON.parse(localStorage.getItem("products"));
            arr.push(product);
            localStorage.setItem("products", JSON.stringify(arr));
        } else {
            let arr = [];
            arr.push(product);
            localStorage.setItem("products", JSON.stringify(arr));
        }
    };

    return (
        <div>
            <Navs />
            <Container>
                <br />
                <Row>
                    <Col>
                        <h2 className="text-center text-danger"> Add Products </h2>
                    </Col>
                </Row>
                <Form style={{ margin: "auto", padding: "1rem" }} onSubmit={(e) => productSubmit(e)} >
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Title :</span></Form.Label>
                                <Form.Control type="text" name="title" placeholder="Enter item" onChange={handleProducts} />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Quantity :</span></Form.Label>
                                <Form.Control type="number" name="quantity" placeholder="Enter product quantity" onChange={handleProducts} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Price :</span></Form.Label>
                                <Form.Control type="number" name="price" placeholder="Enter price of product" onChange={handleProducts} />
                            </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Discount :</span></Form.Label>
                                <Form.Control type="number" name="discount" placeholder="Enter product discount" onChange={handleProducts} />
                            </Form.Group>
                        </Col>
                        <br />
                        <Col md={4}>
                            <Button variant="dark" type="submit" className="mt-4"> Add Item </Button>
                        </Col>
                    </Row>
                </Form>
                        <br /><hr/>
                <Row>
                    <Col>
                        <h2 className="text-center text-danger">Reciever's Details</h2>
                    </Col>
                </Row>
                <Form style={{margin: "auto",padding: "1rem"}}onSubmit={(e) => invoiceAdd(e)}>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Invoice Number :</span></Form.Label>
                                <Form.Control type="number" name="innumber" placeholder="Enter Invoice number" onChange={handler}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Invoice Date :</span></Form.Label>
                                <Form.Control type="text" name="indate" readOnly value={new Date().toLocaleDateString()} id="invoicedate" placeholder="Enter Invoice date" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Due Date :</span></Form.Label>
                                <Form.Control type="date" name="duedate" placeholder="Enter due date" onChange={handler} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Receiver Name :</span></Form.Label>
                                <Form.Control type="text" name="recname" placeholder="Enter Receiver Name" onChange={handler} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Receiver's Email-Id :</span> </Form.Label>
                                <Form.Control type="email" name="recemail" placeholder="Enter Receiver Email Address" onChange={handler} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Receiver Address :</span></Form.Label>
                                <Form.Control type="text" name="recaddress" placeholder="Enter Receiver Address" onChange={handler} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label><span style={{fontWeight:"bold"}}>Receiver Contact No. :</span></Form.Label>
                                <Form.Control type="number" name="reccontact" placeholder="Enter Receiver Contact Number" onChange={handler} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <h6 className="text-center">Products</h6>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items != undefined? items.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.title}</td>
                                        <td>
                                            {value.quantity}
                                        </td>
                                        <td>{value.price}</td>
                                        {console.log(total.push((value.price - (value.price * value.discount / 100)) * value.quantity))}
                                        <td>
                                            {value.discount}
                                        </td>
                                        <td>
                                        {((value.price - (value.price * value.discount / 100)) * value.quantity)}
                                        </td>
                                    </tr>
                                );
                            })
                        : ""}
                        </tbody>
                    </Table>
                    <p>
                        Total Amount:
                        { total.reduce((result,num) => result + num )}
                    </p>

                    <div className="text-center">
                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                <br />
            </Container>
        </div>
    );
}