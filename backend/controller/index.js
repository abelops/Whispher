const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development'])

module.exports = {
    createVent: async function createVent(req,res){
        const{title,content,tag,likes,dislikes} = req.body
        const vent = await knex('vent').insert({title,content,tag,likes,dislikes})
        res.json(vent)
    },

    getVent: async function getVent(req,res){
        const vent = await knex.select('*').from('vent')
        console.log(vent)
        res.json(vent)
    },

    updateVent: async function updateVent(req,res){
        const id = req.params.id
        console.log(id)
        // const vent = await knex('vent').where({id}).update({likes,dislikes})
        // console.log("vent")
        res.json(id)
    }
}