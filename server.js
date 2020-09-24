const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect('mongodb+srv://admin-amritanshu:amritanshu@cluster0.b5dqg.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

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
app.listen(3000,()=>{
  console.log('Server started at 3000')
})