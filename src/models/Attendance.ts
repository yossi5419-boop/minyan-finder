import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
    userId: string;
    minyanId: string;
    status: 'confirmed' | 'cancelled' | 'no-show';
    joinedAt: Date;
    leftAt?: Date;
}

const attendanceSchema = new Schema({
    userId: { type: String, required: true },
    minyanId: { type: Schema.Types.ObjectId, ref: 'Minyan', required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'no-show'], default: 'confirmed' },
    joinedAt: { type: Date, default: Date.now },
    leftAt: Date,
});

export default mongoose.model<IAttendance>('Attendance', attendanceSchema);