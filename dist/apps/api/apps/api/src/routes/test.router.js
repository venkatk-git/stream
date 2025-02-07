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
var test_router_exports = {};
__export(test_router_exports, {
  default: () => test_router_default
});
module.exports = __toCommonJS(test_router_exports);
var import_express = require("express");
const router = (0, import_express.Router)();
router.get("/protected", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.send(`Hello, ${req.session.user.username}`);
  } else {
    console.error("Not Working");
    res.status(401).redirect("/auth/google");
  }
});
var test_router_default = router;
