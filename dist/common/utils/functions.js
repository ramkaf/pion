"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJoiMessage = void 0;
const formatJoiMessage = (joiMessages) => {
  return joiMessages.map((msgObj) => msgObj.message.replace(/"/g, ""));
};
exports.formatJoiMessage = formatJoiMessage;
