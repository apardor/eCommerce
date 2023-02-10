import { Router, Request, Response, NextFunction } from 'express';
import {readAllUsers,readUser, updateUser, createUser ,deleteUser } from './handlers/User'
import {readAllStores, readStore } from './handlers/Stores'
import {readAllProducts, readProduct} from './handlers/Products'

const router = Router();

router.get('/user', readAllUsers)
router.get('/user/:id', readUser )
router.patch('/user/:id', updateUser )
router.post('/user',  createUser )
router.delete('/user/:id', deleteUser)

router.get('/store', readAllStores)
router.get('/store/:id', readStore)

router.get('/product', readAllProducts )
router.get('/product/:id', readProduct )

router.use((err, req: Request, res: Response)=>{
    console.log(err);
    res.json({message: 'in router handler'})
})


export default router