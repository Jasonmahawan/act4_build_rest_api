"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const database = __importStar(require("./product.database"));
const http_status_codes_1 = require("http-status-codes");
exports.productRouter = express_1.default.Router();
exports.productRouter.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield database.findAll();
        if (!allProducts) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `No products found` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total: allProducts.length, allProducts });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.productRouter.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield database.findOne(req.params.id);
        if (!product) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "Product does not exist" });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ product });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.productRouter.post("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, quantity, image } = req.body;
        if (!name || !price || !quantity || !image) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` });
        }
        const newProduct = yield database.create(Object.assign({}, req.body));
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newProduct });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.productRouter.put("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        const findProduct = yield database.findOne(id);
        if (!findProduct) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `Product does not exist...` });
        }
        const updateProducts = yield database.update(id, newProduct);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ updateProducts });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.productRouter.delete("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProduct = yield database.findOne(req.params.id);
        if (!getProduct) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `No product with ID ${req.params.id}` });
        }
        yield database.remove(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: `Product deleted...` });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
