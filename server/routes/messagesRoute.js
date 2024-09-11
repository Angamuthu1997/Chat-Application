const { addMessage, getAllMessage } = require('../controllers/messagesController');
// const  {register, login, setAvatar, getallUsers} = require('../controllers/userController')


const router = require ("express").Router();

router.post("/addmsg/",addMessage );
router.post("/getmsg/",getAllMessage );


module.exports = router;