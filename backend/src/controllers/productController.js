const prisma = require("../lib/prisma");

async function createProduct(req, res) {
  try {
    const { name, price, description, category, imageUrl } = req.body;

    if (!name || !price || !description || !category || !imageUrl) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        category,
        imageUrl,
      },
    });

    return res.status(201).json({
      message: "Produto criado com sucesso.",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao criar produto." });
  }
}

async function listProducts(req, res) {
  try {
    const { search, category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},
          category
            ? {
                category: {
                  equals: category,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao listar produtos." });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, category, imageUrl } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price: price ? Number(price) : undefined,
        description,
        category,
        imageUrl,
      },
    });

    return res.json({
      message: "Produto atualizado com sucesso.",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao atualizar produto." });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      message: "Produto deletado com sucesso.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao deletar produto." });
  }
}

module.exports = {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
};
