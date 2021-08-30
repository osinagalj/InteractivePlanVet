const Subject = require("../models/Subject");



//Dada una materia, obtener una lista de todas sus correlatividades
function getSubjectsBefore(subject) {

    let lista = [];
   // console.log("-------------------------------------------------");
   // console.log("MATERIA ELEGIDA POR EL USUARIO");
    //console.log(subject);
    if(subject.subjects != null){
        for (let step = 0; step < subject.subjects.length; step++) { //para cada materia seleecioanda por el usuario
            let subjectSelected = subject.subjects[step];
            //console.log("subjectSelected");
            //console.log(subjectSelected); 
            lista.push(subjectSelected);
            getSubjectsBefore(subjectSelected);
            
            //console.log('Camina un paso hacia el este');
        }
    }


    return lista;
  }



exports.createSubject = async (req,res) => {
    console.log("ESTA GUARDANDO EN EL BACKEND...");
    //console.log(req.body);

    try{


        let subject;
        subject = new Subject(req.body);
        
        //const allSubjects = await Subject.find();
/*
        for (let j = 0; j < allSubjects.length; j++){
            if(allSubjects[j].name == subject.name){
                res.status(500).send('HUbo un error');
                return;
            }
        }*/
        /*
        let listaCompleta = [];
        let listaACargar = [];
        for (let step = 0; step < subject.subjects.length; step++) { //para cada materia seleecioanda por el usuario
            for (let j = 0; j < allSubjects.length; j++) { //para cada materia existente
                if(subject.subjects[step].name == allSubjects[j].name){

                   console.log("procesando..");
                    listaCompleta = (getSubjectsBefore(allSubjects[j]));
                    for (let i = 0; i < listaCompleta.length; i++){
                        listaACargar.push(listaCompleta[i]);

                    }

                }
            }
        }

        for (let i = 0; i < listaACargar.length; i++){
            if(!subject.subjects.includes(listaACargar[i])){
                subject.subjects.push(listaACargar[i]); //agrega la materia previa
            } //includes
            
        }
*/


        console.log("cargando a db..")
        console.log("subjectt en DBB ")
        console.log(subject)

        await subject.save();
        res.send(subject);
        console.log("Termino de guaradar.")

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}

exports.getSubjects = async (req,res) => {
    //console.log(req.body);
    try{
        const subjects = await Subject.find();
        res.json(subjects)

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}



exports.updateSubject = async (req,res) => {
    console.log("ESTA UPDATEANDO ------------");
    console.log(req.body);
    try{
        const { name,order, year, subjects,subjects2,subjects3, quarter} = req.body;
        let subject = await Subject.findById(req.params.id);

        if(!subject){
            res.status(404).send('No existe el producto');
        }

        subject.name = name;
        subject.year = year;
        subject.order = order;
        subject.subjects = subjects;
        subject.subjects2 = subjects2;
        subject.subjects3 = subjects3;
        subject.quarter = quarter;

        subject = await Subject.findOneAndUpdate({ _id: req.params.id}, subject, {new: true});

        res.json(subject);

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}

exports.getSubject = async (req,res) => {
    console.log(req.body);
    try{
        let subject = await Subject.findById(req.params.id);

        if(!subject){
            res.status(404).send('No existe el producto');
        }

        res.json(subject);

    }catch(error){
        console.log(error);
        res.status(500).send('HUbo un error');
    }
    
}


exports.deleteSubject = async (req, res) => {

    try {
        let subject = await Subject.findById(req.params.id);

        if(!subject) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await Subject.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}