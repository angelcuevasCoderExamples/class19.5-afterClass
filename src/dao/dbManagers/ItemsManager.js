const itemModel = require("../models/item");

class ItemsManager {

    async addItem(item){
       await itemModel.create(item); 
    }

    async getItems(){
        const items = await itemModel.find().lean() 
        return items; 
    }

    async getItem(id){
        const items = await itemModel.find({_id: id}).lean()  //alternativamente findOne
        return items[0]; 
    }

    async updateItem(id, newItem){
       await itemModel.updateOne({_id: id}, newItem)
    }

    async deleteItem(id){
        await itemModel.deleteOne({_id: id})
    }
}

module.exports = ItemsManager; 