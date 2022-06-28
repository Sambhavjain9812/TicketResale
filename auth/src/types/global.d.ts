import mongoose from "mongoose";

interface IUser {
    _id: any //for some time, will change
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserDocument extends IUser,mongoose.Document{
    correctPassword(candidatePwd:string, userPwd:string):Promise<boolean>;
}

interface JwtPayload {
    _id: string
}