import { model, Schema } from "mongoose";

export class User {
  id!: string;
  email!: string;
  name!: string;
  password!: string;
  address!: string;
  isAdmin!: boolean;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
});

export const UserModel = model<User>("User", userSchema);