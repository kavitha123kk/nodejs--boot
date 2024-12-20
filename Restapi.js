const express = require("express")
const users = require("./MOCK_DATA.json");
const fs = require("fs")



const app = express();
const port = 8000;

app.get("/users",(req,res)=>{
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  return res.send(html)
});

//plugin = middleware it takes data and converts into an object
app.use(express.urlencoded({extended:false}))

app.get("/api/users",(req,res) => {
    return res.json(users);
});
app.get("/api/users/:id", (req,res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id==id)
    return res.json(user);
 })
 

app.route("/api/users/:id").get((req,res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id==id)
    return res.json(user);
 })
   .patch((req,res)=>{
    //  edit the user with id
    return res.json({status : "pending"})
  })
  .delete((req,res)=>{
    //  delete the user with id
    return res.json({status : "pending"})
  })

  app.post("/api/users",(req,res)=>{
    //  create new user with id
    const body = req.body;
    console.log("Body",body);

    users.push({...body,id:users.length+1 });
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
      return res.json({status : "success",id:users.length})

    })
  })



app.listen(port,()=>{
    console.log("server started");
})
