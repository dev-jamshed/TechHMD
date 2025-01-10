import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
    message: { type: String, required: true },
    statusCode: { type: Number, required: true },
    stack: { type: String },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);

export default ErrorLog;
