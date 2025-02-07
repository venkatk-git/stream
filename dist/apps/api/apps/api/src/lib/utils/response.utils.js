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
var response_utils_exports = {};
__export(response_utils_exports, {
  errorResponse: () => errorResponse,
  successResponse: () => successResponse
});
module.exports = __toCommonJS(response_utils_exports);
function successResponse(data) {
  return {
    success: true,
    error: null,
    data
  };
}
function errorResponse(status, message, statusCode = 500) {
  return {
    success: false,
    status,
    error: {
      message,
      statusCode
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorResponse,
  successResponse
});
