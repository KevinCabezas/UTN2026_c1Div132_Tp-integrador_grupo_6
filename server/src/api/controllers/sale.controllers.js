import saleModels from "../models/sale.models.js";
import ExcelJS from "exceljs";
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
export const getAllSales = async (req, res) => {
    try {
        const [rows] = await saleModels.getAllSalesWithProducts();

        const ventasPorId = {};

        rows.forEach(row => {
            if (!ventasPorId[row.sale_id]) {
                ventasPorId[row.sale_id] = {
                    id: row.sale_id,
                    customer_name: row.customer_name,
                    total_price: row.total_price,
                    created_at: row.created_at,
                    products: []
                };
            }

            if (row.product_id) {
                ventasPorId[row.sale_id].products.push({
                    product_id: row.product_id,
                    product_name: row.product_name,
                    quantity: row.quantity,
                    price_unit: row.price_unit
                });
            }
        });

        const ventas = Object.values(ventasPorId);

        res.status(200).json({
            payload: ventas,
            total: ventas.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}
export const downloadSalesExcel = async (req, res) => {
    try {
        const [rows] = await saleModels.getAllSalesWithProducts();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Ventas");

        // "columns" define los encabezados Y a qué "key" del objeto
        // corresponde cada columna cuando después hacemos addRow(...)
        sheet.columns = [
            { header: "ID Venta", key: "sale_id", width: 10 },
            { header: "Cliente", key: "customer_name", width: 25 },
            { header: "Fecha", key: "created_at", width: 20 },
            { header: "Producto", key: "product_name", width: 30 },
            { header: "Cantidad", key: "quantity", width: 12 },
            { header: "Precio unitario", key: "price_unit", width: 15 },
            { header: "Total venta", key: "total_price", width: 15 },
        ];

        rows.forEach(row => {
            sheet.addRow({
                sale_id: row.sale_id,
                customer_name: row.customer_name,
                created_at: row.created_at,
                product_name: row.product_name || "Sin productos",
                quantity: row.quantity || "-",
                price_unit: row.price_unit || "-",
                total_price: row.total_price
            });
        });

        // Encabezado en negrita, solo estética
        sheet.getRow(1).font = { bold: true };

        // Estos dos headers son los que le dicen al NAVEGADOR "esto no es
        // para mostrar en pantalla, es un archivo para descargar"
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=ventas.xlsx"
        );

        // En vez de res.json(...), le escribimos el archivo binario
        // directamente a la respuesta
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor al generar el excel"
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