var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var room_router_exports = {};
__export(room_router_exports, {
  default: () => room_router_default
});
module.exports = __toCommonJS(room_router_exports);
var import_express = require("express");
var import_auth = require("../middlewares/auth.middleware");
var import_rooms = require("../controllers/rooms.controller");
const router = (0, import_express.Router)();
router.get("/", (0, import_auth.isAuthenticated)(), import_rooms.createNewRoom);
router.get("/join/:id", (0, import_auth.isAuthenticated)(), import_rooms.joinRoom);
router.get("/connect/:id", (0, import_auth.isAuthenticated)(), import_rooms.connectToRoom);
var room_router_default = router;
//# sourceMappingURL=room.router.js.map
