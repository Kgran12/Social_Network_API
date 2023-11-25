const router = require('express').Router();


const {
  getAllUsers,
  getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addToFriendList,
    removeFromFriendList
} = require('../controllers/usersController');

router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addToFriendList)
.delete(removeFromFriendList);

module.exports = router;
