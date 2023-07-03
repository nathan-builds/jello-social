const { PrismaClient } = require("@prisma/client");
const AppError = require("../utils/appError");
const prisma = new PrismaClient()

exports.createGroup = async (req, res, next) => {
    const { groupName } = req.body;
    const { id: userId } = req.user

    if (!userId) {
        return new AppError('Error creating group, please try again!', 401)
    }
    const result = await prisma.group.create({
        data: {
            name: groupName,
            createdBy: {
                connect: { id: userId }
            },
            users: {
                create: [
                    {
                        user: {
                            connect: { id: userId }
                        }
                    }
                ]
            }

        }
    })
    res.status(200).json({
        msg: 'Group created!'
    })
}

exports.addUserToGroup = async (req, res, next) => {

}

exports.removeUserFromGroup = async (req, res, next) => {

}