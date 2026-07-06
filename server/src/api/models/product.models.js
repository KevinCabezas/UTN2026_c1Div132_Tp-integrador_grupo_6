import connection from "../db/db.js";

const getAllProducts = (limit, offset, line = null) => {
    let sql = `
        SELECT
            p.id,
            p.name,
            p.brand,
            p.price,
            p.stock,
            p.image_url,
            l.name AS line_name
        FROM products p
        INNER JOIN product_lines l ON p.line_id = l.id
        WHERE p.state = 1
    `;
    const params = [];

    if (line) {
        sql += ` AND p.line_id = ?`;
        params.push(line);
    }

    sql += ` LIMIT ? OFFSET ?`;

    params.push(limit, offset);

    return connection.query(sql, params);
}

const getAllProductsForLine = (lineId) => {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.brand,
            p.price,
            p.stock,
            p.image_url,
            l.name AS line_name
        FROM products p
        INNER JOIN product_lines l ON p.line_id = l.id
        WHERE p.state = 1 AND p.line_id = ?
    `;
    return connection.query(sql, [lineId]);
}

const getProductById = (id) => {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.brand,
            p.price,
            p.stock,
            p.state,
            p.image_url,
            l.name AS line_name
        FROM products p
        INNER JOIN product_lines l ON p.line_id = l.id
        WHERE p.id = ? AND p.state = 1
    `;
    return connection.query(sql, [id]);
}

const getProductStock = (id) => {
    const sql = `
        SELECT stock
        FROM products
        WHERE id = ? AND state = 1
    `;
    return connection.query(sql, [id]);
}

const getAllLines = () => {
    const sql = `
        SELECT
            id,
            name
        FROM product_lines
    `;
    return connection.query(sql);
}

const createProduct = (name, brand, price, stock, line_id, image_url) => {
    const sql = `
        INSERT INTO products (name, brand, price, stock, line_id, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return connection.query(sql, [name, brand, price, stock, line_id, image_url]);
}

const updateProduct = (name, brand, price, stock, line_id, image_url, id) => {
    const sql = `
        UPDATE products 
        SET name = ?, brand = ?, price = ?, stock = ?, line_id = ?, image_url = ? 
        WHERE id = ?
    `;
    return connection.query(sql, [name, brand, price, stock, line_id, image_url, id]);
}

const deleteProduct = (id) => {
    const sql = `
        UPDATE products
        SET state = FALSE
        WHERE id = ?
    `;
    return connection.query(sql, [id]);
}

const getAllProductsAdmin = () => {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.brand,
            p.price,
            p.stock,
            p.state,
            p.image_url,
            p.line_id,
            l.name AS line_name
        FROM products p
        INNER JOIN product_lines l ON p.line_id = l.id
    `;
    return connection.query(sql);
}

const activateProduct = (id) => {
    const sql = `
        UPDATE products
        SET state = TRUE
        WHERE id = ?
    `;
    return connection.query(sql, [id]);
}

const countActiveProducts = (line) => {
    let sql = `SELECT COUNT(*) AS total FROM products WHERE state = 1`;
    const params = [];

    if (line) {
        sql += ` AND line_id = ?`;
        params.push(line);
    }

    return connection.query(sql, params);
}

export default {
    getAllProducts,
    getAllProductsAdmin,
    getProductById,
    getProductStock,
    getAllLines,
    createProduct,
    updateProduct,
    deleteProduct,
    activateProduct,
    countActiveProducts,
    getAllProductsForLine
}