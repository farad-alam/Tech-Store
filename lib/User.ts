// lib/User.ts
import { Document, Model, Schema, model, models } from "mongoose";

// 1. Interface for a User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 2. Define schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Create or reuse the model
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
