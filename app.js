const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app= express();
const request= require("request");
const https = require("https");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{

res.sendFile(__dirname+"/sign-up.html");


})

app.post("/",(req,res)=>{
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.Email;
    const data = {members:[{
        email_address : email,
        status : "subscribed",
        merge_fields : {
            FNAME : firstName,
            LNAME : lastName,
        }
    }]};
 const jsonData = JSON.stringify(data);
const url ="https://us2.api.mailchimp.com/3.0/lists/13b7f5926a"
const options ={
    method:"POST",
    auth : "kanishk:12f5b0028b1d36b0c363997afcc4d11c-us2"
}
const request = https.request(url,options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
}else{
    res.sendFile(__dirname+"/failure.html");
}

    response.on("data",function(data){
    })
})
request.write(jsonData);
request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(port);


// api
// 12f5b0028b1d36b0c363997afcc4d11c-us2

// list id 
// 13b7f5926a