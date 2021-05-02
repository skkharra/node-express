const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router()
promoRouter.use(bodyParser.json())

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req,res,next) => {
        res.end('Will sent you all promotions')
    })
    .put((req, res, next) => {
        res.end('You can not perform this action')
    })
    .post((req, res, next) => {
        res.end('adding promotion with name ' + res.body.name + 'and details are ' +req.body.details)
    })
    .delete((req, res, next) => {
        res.end('Will delete all promotions')
    });

promoRouter.route('/:promotionId')
    .get((req,res,next) => {
        res.end('Will send details of the promotion: ' + req.params.promotionId +' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promo/'+ req.params.promotionId);
    })
    .put((req, res, next) => {
        res.write('Updating the promotion: ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.details);
    })
    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.promotionId);
    });


module.exports = promoRouter;