const express=require('express');
const router = express.Router();
const registerModel=require('../db/UserSchema');
const invoiceModel=require('../db/InvoiceSchema');
const nodemailer = require("nodemailer");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.post("/register",(req,res)=>{
    let name=req.body.name;
    let lname=req.body.lname;
    let uname=req.body.uname;
    let email=req.body.email;
    let password=req.body.password;

    let ins=new registerModel({name:name,lname:lname,uname:uname ,email:email,password:password});
    // console.log(ins)
    ins.save((err)=>{
        if(err){
            res.json({"err":1,'msg':"Not Registered"})
        }
        else{
            res.json({"err":0,'msg':'Registered'})
        }
    })
});

router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    registerModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,'msg':"Invalid email or password"})
        }
        else if(data== null){
            res.json({"err":1,'msg':'Fill all the field'})
        }
        else{
            res.json({"err":0,'msg':'Login success',"user":data})
        }
    })
});

router.post("/invoice", (req, res) => {
    let innumber = req.body.innumber;
    invoiceModel.findOne({ innumber: innumber }, (err, details) => {
        if (details) {
            res.send({ message: "Invoice Number Present" });
        } else {
            let data = {
                innumber: req.body.innumber,
                recname: req.body.recname,
                recaddress: req.body.recaddress,
                reccontact: req.body.reccontact,
                recemail: req.body.recemail,
                status:req.body.status,
                indate: req.body.indate,
                duedate: req.body.duedate,
                total:req.body.total,
                items: req.body.items,
            };
            let ins = new invoiceModel(data);
            ins.save((err) => {
                if (err) {
                    res.send({ flag: 0, message: err });
                } 
                else {
                    res.send({ flag: 1, message: "Invoice Added",invoicenumber:req.body.innumber });

                    
                }
            });
        }
    });
});

router.get("/getinvoice",(req,res)=>{
    invoiceModel.find({}, (err, data) => {
        if (err) throw err;
        else{
            res.json(data);
            // console.log(data)    
        }
        
        // res.send(data);
    });
})

router.post("/delete", (req, res) => {
    let id = req.body.id;
    console.log(id);
    invoiceModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.send({ message: err });
        } else {
            res.send({ flag: 1, message: "Data deleted" });
        }
    });
});

router.post("/sendmail", upload.single("file"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "anushka72112bansal@gmail.com",
            pass: "020821births2005",
        },
    });
    let mailOptions = {
        from: "anushka72112bansal@gmail.com",
        to: ["anushka72112bansal@gmail.com","anushkab456@gmail.com"],
        subject: "Invoice Details",
        text: "Invoice Details",
        attachments: [
            {
                filename: "invoice.pdf",
                content: req.file.buffer,
            },
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});

router.post("/edit", (req, res) => {
    let id = req.body.id;
    let status = req.body.status;
    console.log(id);
    console.log(status);
    invoiceModel.updateOne({ _id: id }, { status: status }, (err, data) => {
        if (err) {
            res.send({ message: err });
        } else {
            res.send({ flag: 1, message: "Data updated" });
        }
    });
});

module.exports=router;