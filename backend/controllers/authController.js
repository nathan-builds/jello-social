const fs = require('fs')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require("util");
const {PrismaClient} = require("@prisma/client");
const AppError = require("../utils/appError");

const TOKEN_SECRET = 'fecba48fb6ed32b71a2a2ef8f124f8640a854e85e5b203e17741c2fbcbc46b75';
const prisma = new PrismaClient();

const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
};

exports.login = async (req, res, next) => {
    console.log('IN LOGIN')
    const userName = req.body.username;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: {
            userName: userName
        }
    })
    console.log(user);
    if (!user) {
        return res.status(401).json({
            msg: 'The entered password or user name is incorrect!'
        })
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
        return next(new AppError('Invalid Password Entered, please re-enter', 401))
    }
    // now all downstream functions have the user on the request
    req.user = user;
    sendToken(user, 200, res)

}

exports.createUser = async (req, res, next) => {

    const userName = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username: userName,
        password: hashedPassword
    }
    await prisma.user.create({
        data: {
            userName: userName,
            password: hashedPassword,
            email: 'default@test.com'
        }
    })

    res.status(200).json({
        msg: 'User Created',
        userName: userName
    })
}

const signToken = (id) => {
    return jwt.sign({id: id}, TOKEN_SECRET, {
        expiresIn: 6000
    });
};

const sendToken = (userData, status, res) => {
    const token = signToken(userData);

    res.cookie('jwt', token, cookieOptions);
    res.status(status).json({
        status: 'success',
        data: {
            token: token,
        },
    });
};


exports.protectRoute = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Authorization needed for request, please login', 401))
    }

    // verify token
    const verification = await promisify(jwt.verify)(
        token,
        TOKEN_SECRET
    );
    console.log(verification);

    if (!verification) {
        return next(new AppError('Authorization needed for request, please login', 401))
    }

    //check if user still exists
    const currentUser = await prisma.user.findUnique({
        where: {
            userName: verification.id.userName
        }
    })
    if (!currentUser) {
        return next(new AppError('User no longer exists', 401));
    }
    //
    // //check if password changed since token issue date, pass jwt timestamp "iat" is issued at time
    // if (currentUser.passwordChanged(verification.iat)) {
    //     return next(new AppError('Password changed since token issued', 401));
    // }
    // // may be used later


    // now all downstream functions have the user on the request
    req.user = currentUser;
    next();
}