"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettxHash = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const gettxHash = async (adminId, collectionId) => {
    const { data, error } = await supabase_1.default.from("nfc").select().eq("id", collectionId);
    return error ? error : data;
};
exports.gettxHash = gettxHash;
//# sourceMappingURL=querys.js.map