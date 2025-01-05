"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.todoCreateSchema = exports.updateUserSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
//signinschema
exports.signupSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
//signupschema
exports.signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
//updateuserschema
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    password: zod_1.default.string().min(8).optional(),
});
//todocreateschema
exports.todoCreateSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().optional()
});
//todoupdateschema
exports.updateTodoSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
});
