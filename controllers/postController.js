const {PrismaClient} = require("@prisma/client");
const AppError = require("../utils/appError");
const prisma = new PrismaClient()

exports.createNewPost = async (req, res, next) => {
    // create a new post and return the result and the post
    const postText = req.body.post;
    const user = req.user;
    ;

    if (!postText || !postText.length > 0 || !user) {
        return next(new AppError('Failed to create new post', 401))
    }

    const result = await prisma.posts.create({
        data: {
            text: postText,
            author: {
                connect: {id: user.id}
            }
        }
    })
    res.status(200).json({
        msg: "Post Created",
        postId: result.id,
        postText: result.text,
    })
}


/***
 * Get all a users posts and return them
 */
// on protected route so user is on the request
exports.getAllUserPosts = async (req, res, next) => {
    const userId = req.user.id;
    console.log('USER ID:', userId)
    const allPosts = await prisma.posts.findMany({
        where: {authorId: userId}
    })

    res.status(200).json({
        posts: allPosts
    })
}