const Subject = require("../models/Subject");

exports.createSubject = async (req,res) => {
    console.log(req.body);
    try{
        let subject;
        subject = new Subject(req.body);
        
        await subject.save();
        res.send(subject);

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}

exports.getSubjects = async (req,res) => {
    console.log(req.body);
    try{
        const subjects = await Subject.find();
        res.json(subjects)

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}



