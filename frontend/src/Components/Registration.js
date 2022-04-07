import React,{useState} from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import Nav2 from './Nav2';
import { useNavigate } from "react-router";
import {registration} from '../Config/Myservices'

const regForName = /^[a-zA-Z]{2,100}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/);
const regForUname = RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+){6,100}$/);

export default function Registration() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    errors: {
      name: "",
      lname:"",
      uname:"",
      email: "",
      password: "",
      cpassword: "",
    },
  });
  const [data, setData] = useState({
    name: "",
    lname:"",
    uname:"",
    email: "",
    contact:"",
    password: "",
  });
  
  const onChangeUser = (event) => {
    const { name, value } = event.target;
    console.log(event)
    let errors = state.errors;
    switch (name) {
        case "name":
            errors.name = regForName.test(value)
            ? ""
            : "Name should contain only letters and minimum length should be 2 characters";
            break;

            case "lname":
            errors.lname = regForName.test(value)
            ? ""
            : "Name should contain only letters and minimum length should be 2 characters";
            break;

            case "uname":
                    errors.uname = regForUname.test(value)
                        ? ""
                        : "Username should be between 7-20 characters";
            break;
            
            case "email":
                errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
                break;

            case "password":
                errors.password = regForPassword.test(value)
                ? ""
                : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter amd one special character";
                break;

            case "cpassword":
                errors.cpassword =
                document.getElementById("password").value === value
                    ? ""
                    : "Password and confirm password should be same";
                break;
            default:
                alert("Fill proper details");
            }
    setState({ errors, [name]: value });
    setData({ ...data, [name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    registration(data).then(res=>{
      if(res.data.err===0){
        // localStorage.setItem("token",res.data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/');
        console.log(res.data)
      }
      if(res.data.err===1){
        console.log(res.data)
      }
    })
    if (validate(state.errors)) {
      console.log("hello");
      const formData = {
        name: data.name,
        lname:data.lname,
        uname:data.uname,
        email: data.email,
        password: data.password,
      };
      console.log(formData);
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
    return (
        <>
            <div style={{backgroundImage:"url('./images/regi-login.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"99vw",height:"112vh"}}>
            <Nav2 />
            <Container className=" w-75 pt-3 pb-3  mt-1 mb-3 bg-dark text-secondary">
                <h2 className="pt-1 pb-3 text-center text-warning">REGISTRATION FORM</h2>
                
                <Row>
                    <Col md={5}>
                        <Form method="post" className="pt-4 rounded" onSubmit={formSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Name:</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"  name="name" id="name" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.name.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.name}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Last Name:</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name"  name="lname" id="lname" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.lname.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.lname}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Username:</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Username"  name="uname" id="uname" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.uname.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.uname}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.email.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.email}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Password:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={onChangeUser} required />
                                <Form.Text>
                                    {state.errors.password.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.password}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Confirm Password:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter ConfirmPassword" name="cpassword" id="cpassword" onChange={onChangeUser} required/>
                                <Form.Text>
                                    {state.errors.cpassword.length > 0 && 
                                    (<span style={{ color: "red" }}>{state.errors.cpassword}</span>)}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="warning" type="submit" ><b>Sign Up</b></Button>
                         {/* <Button variant="warning" type="submit" href="/login" className="ml-3"><b>Login</b></Button> */}
                        </Form>
                    </Col>
                    <Col md={6}>
                        <img src="./images/Key2.jpg" className="w-75 pl-4 mt-5" alt="signup"/>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
