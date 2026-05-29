import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";

const categories = ["Camisetas", "Moletons", "Calças", "Regatas"];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchSearch && matchCategory;
  });

  return (
    <main className="products-page">
      <div className="products-header">
        <Link to="/" className="back-link">
          ← Voltar para Home
        </Link>

        <span>CATÁLOGO</span>
        <h1>Produtos SwagWear</h1>
        <p>Explore todos os produtos cadastrados no catálogo da loja.</p>
      </div>

      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas as categorias</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Carregando produtos...</h3>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum produto encontrado.</h3>
          <p>Tente buscar por outro nome ou categoria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>

              <span className="product-category">{product.category}</span>

              <h3>{product.name}</h3>

              <p className="price">
                {Number(product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
