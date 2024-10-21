const AnimalModel = require('../models/Animal')

class AnimalController{
    static async createAnimal(req, res){
        const {nome, raca, idade, in_dono, in_veterinaria} = req.body
        try {
            const animal = await AnimalModel.createAnimal(nome, raca, idade, in_dono, in_veterinaria)
            res.status(201).json(animal)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar animal' });
        }
    }

    static async updateAnimal(req, res){
        const { in_animal } = req.params
        const {nome, raca, idade, in_dono, in_veterinaria} = req.body
        try {
            if(!await AnimalModel.getByAnimalId(in_animal)){
                return res.status(404).json({message: "Animal não existe"})
            }
            const animal = await AnimalModel.updateAnimal(nome, raca, idade, in_dono, in_veterinaria, in_animal)
            return res.status(201).json(animal)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar animal' });
        }
    }

    static async deleteAnimal(req, res){
        const { in_animal } = req.params
        try {
            if(!await AnimalModel.getByAnimalId(in_animal)){
                return res.status(404).json({message: "Animal não existe"})
            }
            await AnimalModel.deleteAnimal(in_animal)
            return res.status(201).json({message: "Animal excluido"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar animal' });
        }
    }

    static async getByAnimalId(req, res){
        const { in_animal } = req.params
        try{
            const animal = await AnimalModel.getByAnimalId(in_animal)
            if(!animal){
                return res.status(404).json({message: "Animal não existe"})
            }
            return res.status(200).json(animal)
        }catch(error){
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar animal' });
        }
    }
    

    static async getAllAnimal(req, res){
        try {
            const animais = await AnimalModel.getAllAnimal()
            res.render('./pages/animais', {animais})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar animais' });
        }
    }

    static async getAllAnimalJson(req, res){
        try {
            const animais = await AnimalModel.getAllAnimal()
            res.status(200).json(animais)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar animais' });
        }
    }
}


module.exports = AnimalController