import mongoose, { Schema, Document } from 'mongoose';

export interface IMinyan extends Document {
    hostId: string;
    title: string;
    type: 'Shacharit' | 'Mincha' | 'Maariv';
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    time: Date;
    endTime?: Date;
    attendees: string[];
    capacity: number;
    status: 'forming' | 'ready' | 'in-progress' | 'completed' | 'cancelled';
    nusach: string;
    isIndoor: boolean;
    hostName: string;
    notes?: string;
    chat: Array<{
        userId: string;
        userName: string;
        message: string;
        timestamp: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const minyanSchema = new Schema({
    hostId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['Shacharit', 'Mincha', 'Maariv'], required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String, required: true },
    },
    time: { type: Date, required: true },
    endTime: Date,
    attendees: [{ type: String }],
    capacity: { type: Number, default: 10 },
    status: { type: String, enum: ['forming', 'ready', 'in-progress', 'completed', 'cancelled'], default: 'forming' },
    nusach: { type: String },
    isIndoor: { type: Boolean, default: true },
    hostName: { type: String, required: true },
    notes: String,
    chat: [{
        userId: String,
        userName: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMinyan>('Minyan', minyanSchema);