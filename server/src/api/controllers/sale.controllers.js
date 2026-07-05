import saleModels from "../models/sale.models.js";

export const createSale = async (req, res) => {

  try {
    // si el insertNewSales falla  salta al catch y nunca se ejecuta el detail

    const { customer_name, products } = req.body;

    const [rows] = await saleModels.insertNewSale(customer_name);
    // console.log(rows.insertId)
    const sale_id = rows.insertId;
    console.log(products);

    // produccts es un lista de objetos 
    for (const p of products) {

      const [response] = await saleModels.insertNewSaleDetail(sale_id, p.product_id, p.quantity);
      await saleModels.updateTotalPriceSale(sale_id, p.product_id, p.quantity);
      console.log(p);
    }

    // console.log(products)
    res.status(201).json({
      message: "Venta creada con exito",
      productId: rows.insertId
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}


export const createSurvey = async (req, res) => {
  const { name, email, products, coment, rating } = req.body;
  try {
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const [rows] = await saleModels.insertSurvey(name, email, products, coment, rating, image_url);

    res.status(201).json({
      message: "Producto creado con exito",
      productId: rows.insertId,
      image_url
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}
// export const createSaleDetail = async (req, res) => {

//   try {
//     console.log(req.body);

//     const { sale_id, product_id, quantity, price_unit } = req.body;

//     const [rows] = await saleModels.insertNewSaleDetail(sale_id, product_id, quantity, price_unit);

//     res.status(201).json({
//       message: "Detalles de venta creada con exito",
//       productId: rows.insertId
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Error interno del servidor"
//     });
//   }
// }