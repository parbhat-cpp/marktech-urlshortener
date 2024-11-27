import { model, Schema } from "mongoose";

interface IUrl {
    originalUrl: string;
    shortId: string;
    clicks: number;
    lastAccessed: Date;
}

const urlSchema = new Schema<IUrl>({
    originalUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    lastAccessed: {
        type: Date,
    }
}, { timestamps: true });

export const Url = model<IUrl>('url', urlSchema);
