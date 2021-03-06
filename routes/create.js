var express = require('express');
var router = express.Router();
var database = require('../services/database');
const io = require('../app');
const socket = require('../services/socket');
/* GET create listing. */
router.get('/', function(req, res, next) {
    if(req.session.room){
        res.redirect('/room/'+req.session.room.id);
    }else{
        res.render('create');
    }
});
router.post('/',function(req,res,next){
    if(req.body.name){
        let newRoom = database.createRoom(req.session.user,{
            name:req.body.name,
            description:req.body.description,
            amount:req.body.amount
        });
        req.session.room = newRoom;
        res.redirect('/room/'+newRoom.id);
    }else{
        res.redirect('back');
    }
});

module.exports = router;
