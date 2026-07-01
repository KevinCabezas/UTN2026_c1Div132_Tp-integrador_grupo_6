import connection from "../db/db.js";

const insertNewSale = (customer_name) => {
  const sql = "INSERT INTO sales (customer_name, total_price) VALUES (?, 0)";
  return connection.query(sql, [customer_name]);
}

const insertNewSaleDetail = (sale_id, product_id, quantity) => {
  const sql = `
    INSERT INTO product_sale (sale_id, product_id, quantity, price_unit)
    SELECT ?, ?, ?, price
    FROM products
    WHERE id = ?
  `;
  return connection.query(sql, [sale_id, product_id, quantity, product_id]);
}

const updateTotalPriceSale = (sale_id, product_id, quantity) => {
  const sql = `
    UPDATE sales
    SET total_price = total_price + (
      SELECT price * ?
      FROM products
      WHERE id = ?
    )
    WHERE id = ?
  `;
  return connection.query(sql, [quantity, product_id, sale_id]);
};

export default {
  insertNewSale,
  insertNewSaleDetail,
  updateTotalPriceSale,
}