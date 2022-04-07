import React, { useEffect, useState } from 'react'
import { Container,Table,Button } from 'react-bootstrap'
import { getInvoice, deleteInvoice, editInvoice } from '../Config/Myservices';
import Navs from './Navs'

export default function Invoicehistory() {
    const [input, setInput] = useState({
        status: "",
    });
    const [state,setState]=useState([]);
    useEffect(()=>{
        getInvoice().then((res)=>{
            setState(res.data);
        })
    })

    const handler = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const Delete = (id) => {
        console.log(id);
        let data = { id: id };
        deleteInvoice(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
    };

    const Edit = (id) => {
        let data = {
            id: id,
            status: input.status,
        };
        console.log(data);
        editInvoice(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
    };

    return (
        <div>
            <Navs />
            <h1 className="mt-4">Invoices History</h1>
            <hr/>
            <Container>
                <Table striped bordered variant="dark">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Status</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((value,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.recname}</td>
                                    <td>{value.innumber}</td>
                                    <td> <input defaultValue={value.status} name="status" onChange={handler} /> </td>
                                    <td><Button variant="success"  onClick={()=>Edit(value._id)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={()=>Delete(value._id)}>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
