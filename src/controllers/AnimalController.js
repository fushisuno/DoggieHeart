const db = require('../config/db');
const AnimalModel = require('../models/Animal');
const session = require('express-session');


class AnimalController {
    static async createAnimal(req, res) {
        const { nome, especie, raca, idade, peso } = req.body;
        var ulrFoto;
        try {
            ulrFoto = req.file.filename;
        } catch (error) {
            ulrFoto = null;
        }

        const in_dono = req.session.dono.in_dono
        try {
            const animal = await AnimalModel.createAnimal(nome, especie, raca, idade, null, peso, ulrFoto, in_dono, null);
            res.redirect('/meus-animais')
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar animal' });
        }
    }

    static async updateAnimal(req, res) {
        const { in_animal } = req.params;
        const { nome, especie, raca, idade, sexo, peso, foto, in_dono, in_veterinaria } = req.body;
        try {
            if (!await AnimalModel.getByAnimalId(in_animal)) {
                return res.status(404).json({ message: "Animal não existe" });
            }
            const animal = await AnimalModel.updateAnimal(nome, especie, raca, idade, sexo, peso, foto, in_dono, in_veterinaria, in_animal);
            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar animal' });
        }
    }

    static async deleteAnimal(req, res) {
        const { in_animal } = req.params;
        try {
            if (!await AnimalModel.getByAnimalId(in_animal)) {
                return res.status(404).json({ message: "Animal não existe" });
            }
            await AnimalModel.deleteAnimal(in_animal);
            return res.status(200).json({ message: "Animal excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar animal' });
        }
    }

    static async getByAnimalId(req, res) {
        const { in_animal } = req.params;
        try {
            const animal = await AnimalModel.getByAnimalId(in_animal);
            if (!animal) {
                return res.status(404).json({ message: "Animal não existe" });
            }
            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar animal' });
        }
    }

    static async getAllAnimal(req, res) {
        try {
            if (req.session.dono) {
                const in_dono = req.session.dono.in_dono
                const animais = await AnimalModel.getAllAnimal(in_dono);
                res.render('./pages/dono/meusAnimais', { dono: req.session.dono, animais: animais })
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar todos os animais' });
        }
    }

    static async getAllAnimalDono(req, res) {
        const { in_dono } = req.params;
        try {
            const animais = await AnimalModel.getAllAnimalDono(in_dono);
            res.status(200).json(animais);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar os animais do dono' });
        }
    }

    static async getAllAnimalJson(req, res) {
        try {
            const animais = await AnimalModel.getAllAnimal();
            res.status(200).json(animais);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar animais' });
        }
    }

    static async getImageAnimalId(req, res) {
        const in_animal = req.params.in_animal;
        try {
            const foto = await AnimalModel.getImageAnimalId(in_animal);
            console.log(foto.foto)
            if (foto) {
                const imageBuffer = foto.foto;
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(imageBuffer);
            }
            res.end()
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar animais' });
        }
    }
}

module.exports = AnimalController;