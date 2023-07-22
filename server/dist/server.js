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
// importing packages and modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const customError_1 = __importDefault(require("./middlewares/customError"));
const PORT = process.env.PORT || 5000;
//import routes
const user_1 = __importDefault(require("./routes/user"));
const student_1 = __importDefault(require("./routes/student"));
//use cors
app.use((0, cors_1.default)({ credentials: true, origin: true }));
//use express json
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//routes
app.use("/auth", user_1.default);
app.use("/api/v1", student_1.default);
//use error middleware
app.use(customError_1.default);
//connect db and listen on port
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.default)();
        console.log(`server listening on Port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
}));
