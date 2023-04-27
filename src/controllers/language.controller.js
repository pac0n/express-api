import { getConnection } from "../database/database";

const getLanguages = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM language");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try{
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM language WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }

};

const updateLanguage = async (req, res) => {
    try{

        const { id } = req.params;
        const { name, programmers } = req.body;

        if (id == "" || name == "" || programmers == "") {
            res.status(400).json({ message: "Petición Invalida. Llene los campos." });
        }

        else{
            const language = { name, programmers };
            const connection = await getConnection();
            const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);
            
            if(result.affectedRows === 0){
                res.status(404).json({ message: "Algo salío mal."});
            }
            else{
                res.json("Registro editado con exito!");
            }
        }
        }catch(error){
            res.status(500);
        res.send(error.message);
    }

};

const addLenguage = async (req, res) => {
    try{
        const { name, programmers } = req.body;
        //console.log(name);
        //console.log(programmers);
        const languages = { name,programmers };

        if(name=="" || programmers==""){
            res.status(400).json({ message: "Petición Invalida. Llene los campos."});
        }
        else{   
            const connection = await getConnection();
            const result = await connection.query("INSERT INTO language SET ?", languages);
            
            res.json("Registro agregado con exito!");
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
    try{
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM language WHERE id = ?", id);

        if(result.affectedRows === 0){
            res.status(404).json({ message: "Petición Invalida. El id no existe."});
        }
        else{
            res.json("Registro borrado con exito!");
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages,
    getLanguage,
    addLenguage,
    updateLanguage, 
    deleteLanguage
};