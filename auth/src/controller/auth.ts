import { Request, Response, NextFunction } from 'express'
import AppError from '../util/AppError'
import { filterData } from '../util'
import User from '../model/userModel'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Schema } from 'mongoose'
import { JWT_EXPIRE, JWT_SECRET } from '../config/base'

const getJwt = (userId:Schema.Types.ObjectId, secret:string, exp:any) => {
  return jwt.sign({ _id: userId }, secret, {
    expiresIn: exp
  });
};
// Should be a schema object!
const correctPassword = async function (candidatePwd:string, userPwd:string) {
  return await bcrypt.compare(candidatePwd, userPwd);
};

export async function login(req: Request, res: Response, next: NextFunction):Promise<any> {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return next(new AppError(400,'please provide email and password'));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await correctPassword(req.body.password, user.password)))
    return next(new AppError(401,'Incorrect email or password'));

  const token = getJwt(user._id, JWT_SECRET, JWT_EXPIRE);
  req.session = { jwt: token }

  res.status(200).json({
    status: true,
    message: 'Login successful',
    token
  });
}

export async function logout(req: Request, res: Response, next: NextFunction):Promise<any> {
  req.session = null;
  res.status(200).json({
    status: true,
    message: 'Logout successful!'
  });
}

export async function register(req: Request, res: Response, next: NextFunction):Promise<any> {
  filterData(req.body,['name','email','password']); //not implemented yet!
  const newUser = await User.create(req.body);
  const token = getJwt(newUser._id, JWT_SECRET, JWT_EXPIRE);
  req.session = { jwt: token }

  res.status(201).json({
    status: true,
    message:
      'User registered!',
    data:{
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token
    }
  });
}

export async function me(req: Request, res: Response):Promise<any> {
  res.status(200).json({
    status: true,
    user: {
      name: req.user.name,
      email: req.user.email,
    }
  });
}


export async function protect(req: Request, res: Response, next:NextFunction):Promise<any> {
  let token = '';
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization?.split(' ')[1];
  }
  if (!token) return next(new AppError(401,'Please login to get access.'));

  const { _id } = jwt.verify(token, JWT_SECRET) as JwtPayload
  console.log(_id);
  const user = await User.findById(_id);
  req.user = user;
  next();
}

export function allow(roles:Array<string>)
                        :(req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403,'Unauthorized route access!'));
    }
    next();
  }
}