const bodyParser = require('body-parser')
const express=require('express')
const { default: mongoose, Schema, Model } = require('mongoose')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
mongoose.connect('mongodb+srv://dineshstdy1:blog123@cluster0.bzhd3b1.mongodb.net/?retryWrites=true&w=majority').then(
    console.log('connected')
)
let createPost=new Schema({
    title:String,
    desc:String,
    type:Number,
    content:String,
    created:Date
})
const CreatModel=mongoose.model('Post-Create',createPost);
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/add',(req,res)=>{
    res.render('admin/addd')
})
app.post('/create-post',(req,res)=>{
    let data=new CreatModel({
        title:req.body.title,
        desc:req.body.desc,
        type:req.body.type,
        content:req.body.article,
        created:new Date()
    })
    data.save()
    res.redirect('/')
})
app.get('/qu',async(req,res)=>{
    let val=await CreatModel.find({type:0})
    res.render('premium',{blog:val})
})
app.get('/pqu',async(req,res)=>{
    let val=await CreatModel.find({type:1})
    res.render('auto',{blog:val})
})
app.get('/:id',async(req,res)=>{
    let value=await CreatModel.findById(req.params.id)
    res.render('content',{blog:value})
})
app.listen(5000,()=>{
    console.log('happy Coding')
})