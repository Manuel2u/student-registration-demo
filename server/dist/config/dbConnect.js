"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//fix depracation warning
mongoose_1.default.set("strictQuery", false);
// const MONGO_URI = () => {
//   if (process.env.NODE_ENV === "development") {
//     return process.env.DEV_MONGO_URI;
//   } else if (process.env.NODE_ENV === "production") {
//     return process.env.PROD_MONGO_URI;
//   }
// };
const DBCONNECT = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URI = "mongodb+srv://manuel:dodoo123@cluster0.2jcmsfo.mongodb.net/?retryWrites=true&w=majority";
    try {
        yield mongoose_1.default.connect(MONGODB_URI, { autoIndex: true });
        console.log("db connected Succesfully");
    }
    catch (err) {
        console.log(err);
        process.exit();
    }
});
exports.default = DBCONNECT;
