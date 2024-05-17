const mongoose = require('mongoose');
const blogModel = require('../model/BlogModel');
const UserModel = require('../model/UsersModel');
const { ObjectId } = mongoose.Types;

exports.postBillet = async (req, res) => {

    const { title, content } = req.body;


    try {
        const newBillet = new blogModel({
            title: title,
            content: content,
            userId: req.user._id
        });

        const savedBillet = await newBillet.save();
        res.status(200).json({ message: 'Billet created successfully', billet: savedBillet });
    } catch (e) {
        console.error('Error creating billet:', e);
        res.status(500).json({ message: 'Failed to create billet', error: e });
    }
};

exports.getAllBillet = async (req, res) => {

    const { login } = req.params;

    try {

        const user = await UserModel.findOne({ login : login});

        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const billets = await blogModel.find({ userId: user._id }).populate('userId', 'login email');
        res.status(200).json(billets);
    } catch (e) {
        console.error('Error fetching billets:', e);
        res.status(500).json({ message: 'Failed to fetch billets', error: e });
    }
}

exports.updateBillet = async (req, res) => {
    const { id, title, content } = req.body;
    try {
        const updatedBillet = await blogModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedBillet) {
            return res.status(404).json({ message: 'Billet not found' });
        }

        res.status(200).json({ message: 'Billet updated successfully', billet: updatedBillet });
    } catch (e) {
        console.error('Error updating billet:', e);
        res.status(500).json({ message: 'Failed to update billet', error: e });
    }
};


exports.deleteBillet = async (req, res) => {


    const { id } = req.body;

    try {
        const deletedBillet = await blogModel.findByIdAndDelete(id);
        if (!deletedBillet) {
            return res.status(404).json({ message: 'Billet not found' });
        }
        res.status(200).json({ message: 'Billet deleted successfully', billet: deletedBillet });
    } catch (e) {
        console.error('Error deleting billet:', e);
        res.status(500).json({ message: 'Failed to delete billet', error: e });
    }
};


exports.allUserBillet = async (req, res) => {


    try {

        const billets = await blogModel.find().populate('userId', 'login email');
        res.status(200).json(billets);
    } catch (e) {
        console.error('Error fetching all billets:', e);
        res.status(500).json({ message: 'Failed to fetch all billets', error: e });
    }
};
exports.getIdBillet = async (req, res) => {

    const { id } = req.params;
    const postObjectId = new ObjectId(id);
    try {
        const billet = await blogModel.findById(postObjectId)
            .populate('userId', 'login email')
            .populate({
                path: 'comments',
                populate: { path: 'authorId', select: 'login email' }
            });
        res.status(200).json(billet);
    } catch (e) {
        console.error('Error fetching billet by id:', e);
        res.status(500).json({ message: 'Failed to fetch billet', error: e });
    }
};
