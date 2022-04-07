import React,{useState} from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import {login} from '../Config/Myservices'
import { useNavigate } from 'react-router';
import Nav2 from './Nav2';

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
      });
      const handler=(event)=>{
        const {name,value} = event.target;
        setData({...data,[name]:value})
    }
    const navigate=useNavigate();
    const loginUser=(event)=>{
        event.preventDefault();
        console.log(data)
        login(data).then(res=>{
            if(res.data.err===0){
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/dashboard');
                console.log(res.data)
            }
            if(res.data.err===1){
                console.log(res.data)
            }
        })
    }
    return (
        <>
            
            <div style={{backgroundImage:"url('./images/login-back.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"100vh"}}>
            <Nav2 />
            <Container className=" w-75 pt-3 pb-3  mt-3 mb-3 bg-dark text-light" >
                <h2 className="pt-2 pb-3 text-center text-success">LOGIN FORM</h2>
                
                <Row>
                    <Col md={6}>
                        <img src="./images/Key2.jpg" className="w-75 pl-4" alt="login"/>
                    </Col>
                    <Col md={5}>
                        <Form className="pt-4 " onSubmit={loginUser}>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={handler} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Pasword:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={handler} required />
                            </Form.Group>
                            <Button variant="success" type="submit" className="mt-3" ><b>Login</b></Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
