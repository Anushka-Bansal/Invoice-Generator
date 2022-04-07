import React from 'react'
import {Navbar,Button} from 'react-bootstrap'

export default function Nav2() {
    return (
        <div>
            <Navbar  variant="dark">
                <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="./images/logo.jpg"
                    width="100"
                    height="90"
                    className="d-inline-block align-top ml-4"
                />
                </Navbar.Brand>
                <div className="ml-auto">
                <Button variant="outline-warning" className="mr-5 ml-4"><a href="/register" style={{ textDecoration: 'none', color: 'black' }}>Register</a></Button>
                <Button variant="outline-success"><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Login</a></Button>
                </div>
            </Navbar>
        </div>
    )
}
