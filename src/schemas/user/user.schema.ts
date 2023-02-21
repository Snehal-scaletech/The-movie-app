import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({ type: Object, required: true})
    full_name: {
        firstname: string, last_name:string
    };

    @Prop({ type: String, required: true, unique:true})
    username: string;

    @Prop({ type: String, required: true, unique: true, trim: true, lowercase: true, match:  [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please provide a valid email address']})
    email: string;

    @Prop({ type: String, required: true})
    password: string;

    @Prop({ type: Number, required: true, minlength: 9, maxlength:12 })
    phone: number;

    @Prop({ type: String, default: null})
    session_id: string;

    @Prop({ type: Date, default:  Date.now})
    createdAt: Date;

    // @Prop({ methods: Function})
    // validatePassword: Function;
    
}
export const UserSchema = SchemaFactory.createForClass(User);


// UserSchema.methods.validatePassword = async function (password: string): Promise<boolean>{
//     return await bcrypt.compareSync(password, this.password);
// }