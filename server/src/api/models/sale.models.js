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


const insertSurvey = (name, email, products, coment, rating, image_url) => {
  const sql = `
        INSERT INTO surveys (name, email, products, coment, rating, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  return connection.query(sql, [name, email,  JSON.stringify(products), coment, rating, image_url]);
}
const getAllSalesWithProducts = () => {
    const sql = `
        SELECT
            s.id AS sale_id,
            s.customer_name,
            s.total_price,
            s.created_at,
            p.id AS product_id,
            p.name AS product_name,
            ps.quantity,
            ps.price_unit
        FROM sales s
        LEFT JOIN product_sale ps ON ps.sale_id = s.id
        LEFT JOIN products p ON p.id = ps.product_id
        ORDER BY s.id DESC
    `;
    return connection.query(sql);
}
export default {
  insertNewSale,
  insertNewSaleDetail,
  updateTotalPriceSale,
  insertSurvey,
  getAllSalesWithProducts
}
