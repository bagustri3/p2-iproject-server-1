const ms = require("ms")
const { Op } = require("sequelize")
const { Arisan, MyArisan, User, LogTran } = require("../models")

class Controller {
    static async fetchArisan(req, res, next) {
        try {
            const result = await Arisan.findAll({
                where : {
                    people : {
                        [Op.lt] : 10
                    }
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async fetchMyArisan(req, res, next) {
        try {
            const result = await MyArisan.findAll({
                where: {
                    UserId : req.user.id
                },
                include : [Arisan]
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async addMyArisan(req, res, next) {
        try {
            const find = await MyArisan.findOne({where : {ArisanId : req.params.id, UserId : req.user.id}})
            if(find){
                throw { name : "Arisan Already exists"}
            } else {
                const add = await MyArisan.create({
                    UserId : req.user.id,
                    ArisanId : req.params.id
                })
                res.status(201).json({id : add.id, User : add.UserId})
            }
        } catch (error) {
            next(error)
        }
    }
    static async fetchLogTransaction(req, res, next) {
        try {
            const result = await LogTran.findAll({
                where : {
                    UserId : req.user.id
                },
                include : [User, Arisan]
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async addTransaction(req, res, next) {
        try {
            const { longtitude, latitude } = req.body
            const create = await LogTran.create({
                UserId : req.user.id,
                ArisanId : req.params.arisanId
            })
            await User.update({longtitude, latitude},{
                where : {
                    id : req.user.id
                }
            })
            res.status(201).json({
                id : create.UserId,
                Message : `created Log Transaction with Arisan Id : ${req.params.arisanId}`
            })
        } catch (error) {
            next(error)
        }
    };
    static async addArisan(req, res, next) {
        try {
            const {name, expiredAt } = req.body
            const createArisan = await Arisan.create({
                name,
                expiredAt :moment( ms(expiredAt)).format('dddd, MMMM Do YYYY')
            })
            res.status(201).json(createArisan)
        } catch (error) {
            next(error)
        }
    }
    static async payTrans (req, res, next) {
        try {
            const update = await LogTran.update({status : "Success"},{
                where : {
                    UserId : req.user.id,
                    ArisanId : req.params.id
                }
            })
            res.status(200).json({message : "Updated status transaction into Success"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller