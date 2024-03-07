const {Router} = require('express');
const ItemsManager = require('../dao/dbManagers/ItemsManager');
const itemModel = require('../dao/models/item');

const router = Router();

const manager = new ItemsManager()


router.get('/do', async (req, res)=>{
    await itemModel.insertMany([
        {description: 'Meat', category:'food', price: 30},
        {description: 'Rise', category:'food', price: 10},
        {description: 'Noodles', category:'food', price: 8},
        {description: 'chicken', category:'food', price: 25},
        {description: 'ramen', category:'food', price: 10},
        {description: 'monitor', category:'computers', price: 40},
        {description: 'mouse', category:'computers', price: 10},
        {description: 'keyboars', category:'computers', price: 10},
        {description: 'case', category:'computers', price: 13},
        {description: 'audio interface', category:'computers', price: 18},
        {description: 'brick', category:'construction', price: 4},
        {description: 'cement', category:'construction', price: 13}
    ])
    res.send({ok:true, message:'inserted'})
})

router.get('/', async (req, res)=>{
    let query = req.query; 

    try {
        let {docs,...rest} = await manager.getItems(query)    
        res.send({status:'success', payload: docs, ...rest})
    } catch (error) {
        res.status(400).send({status:'error', error: error.message })
    }

    
})

router.get('/:id', async (req, res)=>{
    let item = await manager.getItem(req.params.id)

    res.send({item: item})
})



router.post('/', async (req, res)=>{
    await manager.addItem(req.body)
    const items = await manager.getItems();
    req.io.emit('list updated',{items:items})
    res.redirect('/realtimeitems')
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id
    
    await manager.updateItem(id, req.body);

    res.send({status:'success'})
})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id; 
    await manager.deleteItem(id);
    res.send({status:'success'})
})



module.exports = router; 