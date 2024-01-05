const { User } = require('../models/userModel');

const asyncWrapper = (callback) => {
    return async function (req, res) {
        const args = [];
        try {
            if (req.params.id) {
                args.push(req.params.id)
            }
            if (req.body) {
                args.push(req.body)
            }

            const result = await callback(...args);
            if (result === null || result.length === 0) {
                res.status(404).json({errorMessage: 'No such user'});
            } else {
                res.status(200).json({result});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({errorMessage: 'Internal Server Error'});
        }
    };
};
const getAllUsers = asyncWrapper(User.getAll);
const getUserById = asyncWrapper(User.getById);
const createUser = asyncWrapper(User.createUser);
const updateUser = asyncWrapper(User.updateById);
const deleteUser = asyncWrapper(User.deleteById);

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
