const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotion = require('../models/promotions')

const promoRouter = express.Router()

promoRouter.use(bodyParser.json())

promoRouter.route('/')
    .get((req,res,next) => {
        Promotion.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'allpication/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then((promo) => {
                console.log('Promotion created', promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        Promotion.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get((req,res,next) => {
        Promotion.findById(req.params.promoId)
            .then((promo) => {
                if (promo != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
                }
                else {
                    err = new Error('Promo ' + req.params.promoId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/'
            + req.params.promoId + '/promotions');
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {new: true})
            .then((promo)=>{
                res.statusCode=200;
                res.setHeader('Contect-Type', 'application/json');
                res.json(promo);
            }, (err)=> next(err))
            .catch((err)=> next(err));
    })
    .delete((req, res, next) => {
        Promotion.findById(req.params.promoId)
            .then((promo) => {
                if (promo != null) {
                    promotion.remove()
                    promo.save()
                        .then((promo) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(promo);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Promotion ' + req.params.promoId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = promoRouter;