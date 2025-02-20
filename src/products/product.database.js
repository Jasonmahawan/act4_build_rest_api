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
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
let products = loadProducts();
function loadProducts() {
    try {
        const data = fs_1.default.readFileSync("./products.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
function saveProducts() {
    try {
        fs_1.default.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
        console.log("Products saved successfully!");
    }
    catch (error) {
        console.log("Error", error);
    }
}
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(products); });
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () { return products[id]; });
exports.findOne = findOne;
const create = (productInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let id = (0, uuid_1.v4)();
    let product = yield (0, exports.findOne)(id);
    while (product) {
        id = (0, uuid_1.v4)();
        product = yield (0, exports.findOne)(id);
    }
    products[id] = Object.assign({ id: id }, productInfo);
    saveProducts();
    return products[id];
});
exports.create = create;
const update = (id, updateValues) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.findOne)(id);
    if (!product) {
        return null;
    }
    products[id] = Object.assign({ id }, updateValues);
    saveProducts();
    return products[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.findOne)(id);
    if (!product) {
        return null;
    }
    delete products[id];
    saveProducts();
});
exports.remove = remove;
