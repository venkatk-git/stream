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
var InMemorySessionStore_exports = {};
__export(InMemorySessionStore_exports, {
  InMemorySessionStore: () => InMemorySessionStore
});
module.exports = __toCommonJS(InMemorySessionStore_exports);
var import_uuid = require("uuid");
const uuid = import_uuid.v4;
class InMemorySessionStore {
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.googleIds = /* @__PURE__ */ new Map();
  }
  containsGoogleId(googleId) {
    return this.users.has(googleId);
  }
  setGoogleId(googleId) {
    const _id = uuid();
    this.users.set(googleId, _id);
    this.googleIds.set(_id, googleId);
  }
  getUser(googleId) {
    return this.users.get(googleId);
  }
  getGoogleId(_id) {
    return this.googleIds.get(_id);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemorySessionStore
});
//# sourceMappingURL=InMemorySessionStore.js.map
