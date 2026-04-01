import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    location: {
        latitude: number;
        longitude: number;
    };
    nusach: string;
    profilePic?: string;
    reliabilityScore: number;
    showUpCount: number;
    noShowCount: number;
    verificationCode?: string;
    isVerified: boolean;
    privacySettings: {
        showExactLocation: boolean;
        allowAnonymous: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { latitude: { type: Number }, longitude: { type: Number }, },
    nusach: { type: String, enum: ['Ashkenaz', 'Sephard', 'Mizrahi', 'Other'] },
    profilePic: String,
    reliabilityScore: { type: Number, default: 5 },
    showUpCount: { type: Number, default: 0 },
    noShowCount: { type: Number, default: 0 },
    verificationCode: String,
    isVerified: { type: Boolean, default: false },
    privacySettings: {
        showExactLocation: { type: Boolean, default: false },
        allowAnonymous: { type: Boolean, default: false },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);