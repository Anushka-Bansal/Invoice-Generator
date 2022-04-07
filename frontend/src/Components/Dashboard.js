import React,{useEffect, useState} from 'react'
import Navs from './Navs'
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import { getInvoice } from '../Config/Myservices';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  let [total,setTotal]=useState(0);
  let [paid,setPaid]=useState(0);
  let [partial,setPartial]=useState(0);
  let [unpaid,setUnpaid]=useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
    getInvoice().then((res)=>{
      // console.log(res.data);
      res.data.forEach((element)=>{
        if(element.status === "unpaid"){
          unpaid += 1;
          setUnpaid(unpaid);
        }
        else if(element.status === "paid"){
          paid += 1;
          setPaid(paid);
        }
        else if(element.status === "partially paid"){
          partial += 1;
          setPartial(partial);
        }
        total += 1;
        setTotal(total);
      })
    })
  },[])
    return (
        <div>
          <Navs />
          <Container>
            <Row>
              <Col className="text-center mt-4">
                <Card className='bg-secondary text-light'>
                  <Card.Body>
                    <Card.Title>Total Invoices</Card.Title>
                    <Card.Text>
                      {total}
                    </Card.Text>
                    <Button variant="primary"onClick={()=>navigate('/history')}>View Invoices</Button>
                  </Card.Body>
                </Card> 
              </Col>
              </Row>
              <Row>
              <Col className=" mt-4" md={4}>
                <Card className="bg-success">
                  <Card.Body>
                    <Card.Title>Paid Invoices</Card.Title>
                    <Card.Text>
                      {paid}
                    </Card.Text>
                    {/* <Button variant="primary">View Invoices</Button> */}
                  </Card.Body>
                </Card> 
              </Col> 
              <Col className=" mt-4" md={4}>
                <Card className="bg-warning">
                  <Card.Body>
                    <Card.Title>Partially Paid Invoices</Card.Title>
                    <Card.Text>
                      {partial}
                    </Card.Text>
                    {/* <Button variant="primary">View Invoices</Button> */}
                  </Card.Body>
                </Card> 
              </Col> 
              <Col className=" mt-4" md={4}>
                <Card className="bg-danger">
                  <Card.Body>
                    <Card.Title>Unpaid Invoices</Card.Title>
                    <Card.Text>
                      {unpaid}
                    </Card.Text>
                    {/* <Button variant="primary">View Invoices</Button> */}
                  </Card.Body>
                </Card> 
              </Col> 
            </Row>
          </Container> 
        </div>
    )
}
