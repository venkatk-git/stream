var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var room_model_exports = {};
__export(room_model_exports, {
  default: () => room_model_default
});
module.exports = __toCommonJS(room_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const roomSchema = new import_mongoose.default.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true
  },
  ownerId: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: {
    type: [import_mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
    validate: {
      validator: (members) => members.length <= 50,
      message: "A room cannot have more than 50 members"
    }
  },
  videoQueue: {
    type: [
      {
        videoId: String,
        title: String,
        _id: false
      }
    ],
    default: [
      {
        videoId: "IZHGcU0U_W0",
        title: "MATTA | The Greatest Of All Time | Thalapathy Vijay | Venkat Prabhu |Yuvan Shankar Raja"
      }
    ]
  },
  playingVideo: {
    type: {
      videoId: String,
      timeStamp: {
        type: Number,
        default: 0
      }
    },
    default: {
      videoId: "IZHGcU0U_W0",
      timeStamp: 0
    }
  },
  roomType: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  }
});
var room_model_default = import_mongoose.default.model("Room", roomSchema);
//# sourceMappingURL=room.model.js.map
