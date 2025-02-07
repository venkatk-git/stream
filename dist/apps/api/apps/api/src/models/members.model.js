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
var members_model_exports = {};
__export(members_model_exports, {
  default: () => members_model_default
});
module.exports = __toCommonJS(members_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const membersSchema = new import_mongoose.default.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true
  },
  members: {
    type: [
      {
        name: String,
        memberId: {
          type: import_mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        profileImg: String,
        _id: false
      }
    ],
    ref: "User",
    default: [],
    unique: true,
    validate: {
      validator: (members) => members.length <= 50,
      message: "A room cannot have more than 50 members"
    }
  }
});
var members_model_default = import_mongoose.default.model("Member", membersSchema);
