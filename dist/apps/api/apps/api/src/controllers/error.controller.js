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
var error_controller_exports = {};
__export(error_controller_exports, {
  globalErrorHandler: () => globalErrorHandler
});
module.exports = __toCommonJS(error_controller_exports);
var import_response = require("../lib/utils/response.utils");
function globalErrorHandler(err, _req, res, _next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json(
    (0, import_response.errorResponse)(
      err.status,
      // Error status (e.g., 'error', 'fail')
      err.message,
      // Error message providing details
      err.statusCode
      // HTTP status code for the error
    )
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  globalErrorHandler
});
