const express = require('express');
const router = express.Router();
const State = require('../../models/state');
const Exam = require('../../models/exam');
const Detail = require('../../models/details');
const Update = require('../../models/updates');

router.get('/', async (req,res) => {
    console.log(req.query);
    try{
     Exam.find()
         .sort({ date: -1 })
         .limit(20)
         .then(exams => res.json(exams))
    }catch(err){
        
    }
})

router.get('/state', async (req,res) => {
    try{
        State.find().sort({ date: -1 }).then(exam => res.json(exam));
    }catch(err){

    }
})

router.post('/category', async (req,res) => {
    try{
        if(req.body.categoryMain && req.body.categoryBase){
            const categoryMain = req.body.categoryMain.trim();
            const categoryBase = req.body.categoryBase.trim();
            Exam.find({ categoryMain:categoryMain, categoryBase:categoryBase}).then(exam => res.json(exam));
        }else if(req.body.categoryMain){
            const categoryMain = req.body.categoryMain.trim();
            Exam.find({ categoryMain:categoryMain}).then(exam => res.json(exam));
        }else if(req.body.categoryBase){
            const categoryBase = req.body.categoryBase.trim();
            Exam.find({ categoryBase:categoryBase}).then(exam => res.json(exam));
        }
    }catch(err){

    }
})
router.post('/get', async (req,res) => {
    try{
        const abbreviation = req.body.abbreviation.trim();
        Detail.find({abbreviation:abbreviation}).then(exam => res.json(exam));
    }catch(err){

    }
})
router.post('/type', async (req,res) => {
    try{
       switch(req.body.type.trim()){
           case 'New_Updates':{
                Update.find({name:req.body.name.trim()}).then(update => res.json(update));
                break;
           }
           case 'Admit_Card':{
                Update.find({name:req.body.name.trim()}).then(update => res.json(update));
           }
           case 'Result':{
                Update.find({name:req.body.name.trim()}).then(update => res.json(update));
           }
           default:{
                res.json({message:'No Update'});
           }
       }
    }catch(err){
        
    }
})
router.post('/updates', async (req,res) => {
    try{
        switch(req.body.type.trim()){
            case 'New_Updates':{
                Update.find()
                    .sort({ date: -1 })
                    .limit(20)
                    .then(update => {
                        res.json([{_id:update[0]._id,name:update[0].name}])
                    })
                break;
            }
            case 'Admit_Card':{
                var array = [{
                    _id:1,
                    name:'Jee Mains Admit Card Released'
                },{
                    _id:2,
                    name:'Wbjee Admit Card Released'
                }];
                res.json(array);
            }
            case 'Result':{
                var array = [{
                    _id:1,
                    name:'Jee Mains Exam Result Announced'
                },{
                    _id:2,
                    name:'Wbjee Exam Result Announced'
                }];
                res.json(array);
            }
            default:{
                res.json({message:"Getting Updates"});
            }
        }
    }catch(err){

    }
})
router.post('/user', async (req,res) => {
    try{
        res.json({"message":req.body.data});
    }catch(err){

    }
})
router.post('/s', async (req,res) => {
    try{
        var word = req.body.abbreviation.trim().split(' ');
        var result = [];
        var reg = new RegExp(req.body.abbreviation.trim(),'i');
        var exam = Exam.find({ abbreviation: reg},{'abbreviation':2}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
        exam.exec(function(err,data){
            if(!err){
                if(data && data.length && data.length > 0){
                    data.forEach(exa => {
                        let obj = {
                            id:exa._id,
                            abbreviation:exa.abbreviation,
                            categoryBase:exa.categoryBase
                        };
                        result.push(obj);    
                    });
                    res.json(result);
                }else{
                    exam = "";
                    res.status(404).json({message:"Not Found"});
                }
            }
        });
    }catch(err){

    }
})

router.post('/add', async (req,res) => {
    const exam = await Exam.findOne({ abbreviation: req.body.abbreviation});

    if(exam){
        res.status(422).json({message:"Exam Already Exists"});
    }
    else{
        const newExam = new Exam({
            name:req.body.name,
            abbreviation:req.body.abbreviation,
            link:req.body.link,
            logo:req.body.logo,
            categoryMain:req.body.categoryMain,
            categoryBase:req.body.categoryBase,
        });
        const newexam = await newExam.save();
        res.json(newexam);
    }
})

router.post('/temp', async (req,res) => {

    const newUpdate = new Update({
        name:req.body.name,
        intro:req.body.intro,
        fee:req.body.fee,
        date:req.body.date,
        req:req.body.req,
        link:req.body.link
    });
    const newupdate = await newUpdate.save();
    res.json(newupdate);
})

router.post('/down', async (req,res) => {
    const exam = await Detail.findOne({ abbreviation: req.body.abbreviation});

    if(exam){
        res.status(422).json({message:"Exam Already Exists"});
    }
    else{
        const newExam = new Detail({
            name:req.body.name,
            abbreviation:req.body.abbreviation,
            link:req.body.link,
            logo:req.body.logo,
            intro:req.body.intro,
            type:req.body.type,
            duration:req.body.duration,
            times:req.body.times,
            eligibility:req.body.eligibility,
            language:req.body.language,
            wikipedia:req.body.wikipedia,
            regSdate:req.body.regSdate,
            regEdate:req.body.regEdate,
            lfeedate:req.body.lfeedate,
            admit:req.body.admit,
            examdate:req.body.examdate,
            genobcfee:req.body.genobcfee,
            scstfee:req.body.scstfee,
            phfee:req.body.phfee
        });
        const newexam = await newExam.save();
        res.json(newexam);
    }
})

router.post('/up', async (req,res) => {
    try{
        const id = req.body.id;
        const data = req.body.data;
        const result = await Exam.updateOne({ _id: id },{
            $set:{
                categoryMain:data
            }
        },{upsert:true});
        Exam.findById(id)
        .then(exam => { res.json(exam)})
    }catch(err){

    }
})

router.delete('/del/:id', async (req,res) => {
    Exam.findById(req.params.id)
        .then(exam => exam.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
})

module.exports = router;