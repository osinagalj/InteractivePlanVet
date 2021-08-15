const Subject = require("../models/Subject");



//Dada una materia, obtener una lista de todas sus correlatividades
function getSubjectsBefore(subject) {

    let lista = [];
    console.log("-------------------------------------------------");
    console.log("MATERIA ELEGIDA POR EL USUARIO");
    console.log(subject);
    if(subject.subjects != null){
        for (let step = 0; step < subject.subjects.length; step++) { //para cada materia seleecioanda por el usuario
            let subjectSelected = subject.subjects[step];
            console.log("subjectSelected");
            console.log(subjectSelected); 
            lista.push(subjectSelected);
            getSubjectsBefore(subjectSelected);
            
            console.log('Camina un paso hacia el este');
        }
    }


    return lista;
  }



exports.createSubject = async (req,res) => {
    console.log("ESTA GUARDANDO EN EL BACKEND");
    //console.log(req.body);

    try{


        let subject;
        subject = new Subject(req.body);
        
        const allSubjects = await Subject.find();
        console.log("TODAS LAS MATERIAS:")
        console.log(allSubjects)
        console.log("SEGUNDA MATERIA ")
        console.log(allSubjects[2])
        //la materia no puede existr
        for (let j = 0; j < allSubjects.length; j++){
            if(allSubjects[j].name == subject.name){
                console.log("ERROR LA MATERIA YA EXISTE");
                res.status(500).send('HUbo un error');
                return;
            }
        }
        let listaCompleta = [];
        for (let step = 0; step < subject.subjects.length; step++) { //para cada materia seleecioanda por el usuario
            for (let j = 0; j < allSubjects.length; j++) { //para cada materia seleecioanda por el usuario
                if(subject.subjects[step].name == allSubjects[j].name){
                    console.log("Materia a recursion: ");
                    console.log( allSubjects[j]);
                   
                    listaCompleta = (getSubjectsBefore(allSubjects[j]));
                    for (let i = 0; i < listaCompleta.length; i++){
                        subject.subjects.push(listaCompleta[i]); //agrega la materia previa
                    }
                    console.log("LISTA CON TODAS LAS CORRELATIVIDADES");
                    console.log(listaCompleta);
                }
            }
        }
/* 
        for(let h = 0; h < allSubjects.length; h++){//le agrego el next a la otra
            if(allSubjects[h].name == listaCompleta[i].name){
                allSubjects[h].subjectsNext.push(subject);
                subjectDB = await Subject.findOneAndUpdate({ _id: allSubjects[h].id}, allSubjects[h], {new: true});
            }
        } */

        //para cada materia pido todas las correlativas, si en alguna de las
        // correlativas esta la que voy a insertar, 
        //le agrega esta materia a las next de la materia a insertar.
        console.log(" - ------------------- TODAS LAS MATERIAS CON LSO NEXT : --------------- ");
        console.log(allSubjects);

       

        //2. obtener todas las materias
            
        //console.log(listaDeCorrelativas);
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



exports.updateSubject = async (req,res) => {
    console.log(req.body);
    try{
        const { name, year, subjects, subjectsNext} = req.body;
        let subject = await Subject.findById(req.params.id);

        if(!subject){
            res.status(404).send('No existe el producto');
        }

        subject.name = name;
        subject.year = year;
        subject.subjects = subjects;
        subject.subjectsNext = subjectsNext;

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