import React from 'react'
import {Navbar,Nav,Button, Container} from 'react-bootstrap'

export default function Navs() {
    const logout=()=>{
        localStorage.clear();
    }
    return (
        <div>
            <Navbar variant="dark" className="bg-dark">
                <Container>
                <img
                alt=""
                src="./images/logo.jpg"
                width="120"
                height="100"
                className="d-inline-block align-top ml-4"
                />
                <Nav className="me-auto ">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/invoice">Add Invoice</Nav.Link>
                    {/* <Nav.Link href="/generate">Generate-Pdf</Nav.Link> */}
                    {/* <Nav.Link href="/setting">Settings</Nav.Link> */}
                    <Button variant="dark"><a href="/" style={{ textDecoration: 'none', color: 'white' }} onClick={logout}>Logout</a></Button>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
