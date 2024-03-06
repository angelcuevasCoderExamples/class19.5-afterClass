const {Router}= require('express');
const CartManager = require('../dao/dbManagers/CartManager');
const ItemsManager = require('../dao/dbManagers/ItemsManager');

const router = Router();


const itemsManager = new ItemsManager(__dirname+'/../files/items.json')
const cartManager = new CartManager(__dirname+'/../files/carts.json');

router.post('/',async (req, res)=>{
    await cartManager.addCart();
    res.send({status:'success'})
})

router.get('/:id',async (req, res)=>{
    const id = req.params.id; 

    const cart = await cartManager.getCart(id)

    res.send({status:'success', items: cart.items})

})

router.post('/:id/item/:iid', async (req, res)=>{
    const id = req.params.id; 
    const itemId = req.params.iid; 

    const cart = await cartManager.getCart(id)
    const item = await itemsManager.getItem(itemId)
    if(!cart){
        res.status(400).send('Cart does not exist')
    }
    if(!item){
        res.status(400).send('item does not exist')
    }

    cartManager.addItem(id, itemId)

    res.send({status:'success'})
})


module.exports = router; 