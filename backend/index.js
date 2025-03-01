const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const app = express(); // 🔹 Thêm dòng này để khởi tạo app

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // port: "3306",
  password: "252525",
  database: "test"
})


app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.json("hello")
})

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

// app.post("/books",(req,res)=>{
//   const q = "INSERT INTO books(`title`,`desc`,`cover`) VALUES (?)"
//   const values = ["title1","desc1","coverpic"]

//   db.query(q,[values],(err,data)=>{
//     if (err) return res.json(err)
//     // return res.json(data)
//     return res.json("book has been created")
//   })
// })
app.post("/add", (req, res) => {
  const q = "INSERT INTO books(`title`,`desc`,`cover`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    // return res.json(data)
    return res.json("book has been created")
  })
})


app.listen(8800, () => {
  console.log("app is running on port 8800");
});
