import mongoose, { model , models } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser{
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
     createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            required: false,

            default: ""
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User  = models?.User || model<IUser>("User",userSchema)

export default User;