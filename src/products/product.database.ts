import { Product, Products, UnitProduct } from "./product.interface";
import { v4 as random } from "uuid";
import fs from "fs";

// ✅ Fix typo: Correct function name to `loadProducts()`
let products: Products = loadProducts();

function loadProducts(): Products {
    try {
        const data = fs.readFileSync("./products.json", "utf-8");
        return JSON.parse(data) as Products;
    } catch (error) {
        console.log(`Error loading products: ${error}`);
        return {};
    }
}

function saveProducts() {
    try {
        fs.writeFileSync("./products.json", JSON.stringify(products, null, 2), "utf-8");
        console.log("✅ Products saved successfully!");
    } catch (error) {
        console.log("❌ Error saving products:", error);
    }
}

export const findAll = async (): Promise<UnitProduct[]> => Object.values(products);

export const findOne = async (id: string): Promise<UnitProduct | null> => {
    return products[id] || null;
};

export const create = async (productInfo: Product): Promise<UnitProduct | null> => {
    let id = random();
    let product = await findOne(id);

    while (product) {
        id = random();
        product = await findOne(id);
    }

    const newProduct: UnitProduct = {
        id,
        ...productInfo
    };

    products[id] = newProduct;
    saveProducts();

    return newProduct;
};

export const update = async (id: string, updateValues: Product): Promise<UnitProduct | null> => {
    const product = await findOne(id);

    if (!product) {
        return null;
    }

    products[id] = {
        ...product,
        ...updateValues
    };

    saveProducts();

    return products[id];
};

export const remove = async (id: string): Promise<void | null> => {
    if (!(id in products)) {
        return null;
    }

    delete products[id];
    saveProducts();
};

