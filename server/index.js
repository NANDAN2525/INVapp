const express= require('express');
const app=express();
const mysql =require("mysql");
const bodyParser=require("body-parser");
const cors =require("cors");

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password5',
    database:'itemdb'
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

// app.get("/",(req,res)=>{
//     const insertval= "INSERT INTO itemdb.item (ItemName,ItemQuantity) VALUES  ('ITEM1','25');"
//     db.query(insertval,(err,result)=>{
//         res.send("sucessfully installed");
//     })
// })

app.post("/insert",(req,res)=>{
    const insertval= "INSERT INTO itemdb.item (ItemName,ItemQuantity) VALUES  (?,?);"
    const itemname=req.body.itemname;
    const itemquantity=req.body.itemquantity;
    db.query(insertval,[itemname,itemquantity],(err,result)=>{
        res.send("sucessfully installed");
        console.log(err);
        console.log("result" + result);
        // console.log(err);
    })
})

app.post("/update",(req,res)=>{
    const insertval= "UPDATE itemdb.item SET ItemQuantity = ItemQuantity + (?) WHERE ItemName = ?;"
    const itemname=req.body.itemname;
    const itemquantity=req.body.itemquantity;
    db.query(insertval,[itemquantity,itemname],(err,result)=>{
        res.send("sucessfully installed");
        console.log(err);
        console.log("result" + result);
    })
})

app.post("/find",(req,res)=>{
    const insertval= "SELECT COUNT(*) AS count FROM itemdb.item WHERE ItemName = ?;"
    const itemname=req.body.itemname;
    // const itemquantity=req.body.itemquantity;
    
    db.query(insertval, [itemname], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.send(false); // Send response indicating error
        }
        
        const count = results[0].count;
        const isItemNameExists = count > 0;
        return res.send(isItemNameExists); // Send response with the value
      });
        })
    
app.listen(3002,()=>{console.log("run in 3001")})