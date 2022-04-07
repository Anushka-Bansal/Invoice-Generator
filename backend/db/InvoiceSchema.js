const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    innumber: { type: Number, required: true },
    recname: { type: String, required: true },
    recaddress: { type: String, required: true },
    reccontact: { type: Number, required: true },
    recemail: { type: String, required: true },
    status:{type:String,required:true},
    indate: { type: String, required: true },
    duedate: { type: String, required: true },
    total:{type:Number,required:true},
    items: { type: Array, required: true },
});

module.exports = mongoose.model("invoices", invoiceSchema);