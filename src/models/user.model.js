import {model,Schema} from "mongoose";


const schema =  new Schema(
    {
        name:{
            type : String,
            required : true,
        },
        email:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        avatar : {
            type : String,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },{
        timestamps : true
    }
);

export const User = model("User",schema);