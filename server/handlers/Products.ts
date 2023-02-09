import { Request, Response  } from "express";
import db from "../database.js";



export const readAllProducts = (req: Request, res: Response) => {
    const sql = "select * from ProductData";
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


export const readProduct = (req: Request, res: Response) => {
    const sql = "select * from ProductData where id = ?";
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


