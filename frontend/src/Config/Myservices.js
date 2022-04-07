import axios from "axios";
import {MAIN_URL} from "./Url";

export function registration(data){
    return axios.post(`${MAIN_URL}posts/register`,data);
}

export function login(data){
    return axios.post(`${MAIN_URL}posts/login`,data)
}

export function addInvoice(data){
    return axios.post(`${MAIN_URL}posts/invoice`,data)
}

export function getInvoice(){
    return axios.get(`${MAIN_URL}posts/getinvoice`)
} 

export function deleteInvoice(data){
    return axios.post(`${MAIN_URL}posts/delete`,data)
}

export function editInvoice(data){
    return axios.post(`${MAIN_URL}posts/edit`,data)
}

export function sendMail(data) {
    return axios.post(`${MAIN_URL}posts/sendmail`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}