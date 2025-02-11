"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/**
 * TODO: Create the Room Schema for storing roomId, owner, members[], videoQueue[],...
 */
const roomSchema = new mongoose_1.default.Schema({
    roomId: {
        type: String,
        unique: true,
        required: true,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
        validate: {
            validator: (members) => members.length <= 50,
            message: 'A room cannot have more than 50 members',
        },
    },
    videoQueue: {
        type: [
            {
                videoId: String,
                title: String,
                _id: false,
            },
        ],
        default: [
            {
                videoId: 'IZHGcU0U_W0',
                title: 'MATTA | The Greatest Of All Time | Thalapathy Vijay | Venkat Prabhu |Yuvan Shankar Raja',
            },
        ],
    },
    playingVideo: {
        type: {
            videoId: String,
            timeStamp: {
                type: Number,
                default: 0,
            },
        },
        default: {
            videoId: 'IZHGcU0U_W0',
            timeStamp: 0,
        },
    },
    roomType: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
});
exports.default = mongoose_1.default.model('Room', roomSchema);
