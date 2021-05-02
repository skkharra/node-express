const express = require('express');
const bodyParser = require('body-parser');

const leadRouter = express.Router();
leadRouter.use(bodyParser.json());

leadRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req,res,next) => {
        res.end('Will sent you all leaders')
    })
    .put((req, res, next) => {
        res.end('You can not perform this action')
    })
    .post((req, res, next) => {
        res.end('add you as a leader with name ' + res.body.name + 'and details are ' +req.body.details)
    })
    .delete((req, res, next) => {
        res.end('Will delete all leaders')
    });

leadRouter.route('/:leaderId')
    .get((req,res,next) => {
        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leader/'+ req.params.leaderId);
    })
    .put((req, res, next) => {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.details);
    })
    .delete((req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

module.exports = leadRouter;


