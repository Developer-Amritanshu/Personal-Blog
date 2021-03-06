const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))


//connect mongoose

const blogSchema = new mongoose.Schema({
  title:String,
  content:String
})

const Blog = mongoose.model('Blog',blogSchema)

let post ;

app.get('/',(req,res)=>{
 Blog.find({},(err,data)=>{
   if(err){
     console.log(err);
   }else{
     res.render('home',{post:data})
   }
 })
})
/*Changing title for post request*/
/*This will fix the problem regarding the post request.*/
app.post('/compose',(req,res)=>{

  post = new Blog ({
    t: req.body.t,
    c: req.body.c
  })

  post.save((e)=>{
    if(e){
      console.log(e);
    }
  })

  res.redirect('/')
})
/*Changed*/

app.get('/compose',(req,res)=>{
  res.render('compose')
})

app.post('/compose',(req,res)=>{

  post = new Blog ({
    title: req.body.title,
    content: req.body.content
  })

  post.save((err)=>{
    if(err){
      console.log(err);
    }
  })

  res.redirect('/')
})


app.get('/:id',(req,res)=>{
  Blog.findOne({title:req.params.id},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.render('post',{post:data})
    }
  })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
  console.log(`Server started at ${port}`)
})
