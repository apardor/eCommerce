import {Request, Response  } from "express";
import db from "../database.js";
import md5 from "md5";



export const readAllUsers = (req: Request, res: Response) => {
    const sql = "select * from UserData";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
};


export const readUser = (req: Request, res: Response) => {
    const sql = "select * from UserData where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
};


export const updateUser = (req: Request, res: Response) => {
    const data = {
        email: req.body.email,
        password : req.body.password,
        role : req.body.role,
        storeId: req.body.storeId
    }
    db.run(
        `UPDATE UserData set 
           email = COALESCE(?,email), 
           password = COALESCE(?,password)
           role = COALESCE(?,role)
           storeId = COALESCE(?,storeId)
           WHERE id = ?`,
        [data.email, data.password, data.role, data.storeId, req.params.id],
        function (err, result) {
            if (err){
                res.status(404).json({message: err.message});              
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        });
}





export const  deleteUser = (req: Request, res: Response) => {
    db.run(
        'DELETE FROM UserData WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
        });
}




export const createUser = (req: Request, res: Response) => {
    const errors: string[] = [];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        email: req.body.email,
        role: req.body.role,
        password : md5(req.body.password)
    }
    const sql ='INSERT INTO UserData (email, password, role) VALUES (?,?,?)'
    const params =[data.email, data.password, data.role]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
}

