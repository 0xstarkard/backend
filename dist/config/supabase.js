"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
dotenv_1.default.config();
const supabase = (0, supabase_js_1.createClient)("https://mnnbyrdnpuienzscjzjk.supabase.co", process.env.SUPA_KEY);
exports.default = supabase;
//# sourceMappingURL=supabase.js.map