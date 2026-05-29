import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./home.css";
import logo from "../assets/logo.svg";

import { FiSearch, FiHeart, FiShoppingBag } from "react-icons/fi";

const categories = ["Camisetas", "Moletons", "Calças", "Regatas"];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos.");
        }

        const data = await response.json();
        setProducts(data);
      } catch {
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="home">
      {/* NAVBAR */}

      <header className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SwagWear" />
          </Link>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Produtos</Link>
        </nav>

        <div className="nav-icons">
          <FiSearch />
          <FiHeart />
          <FiShoppingBag />
        </div>
      </header>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <p className="tag">DROP LIMITED 2026</p>

          <h1>
            Streetwear
            <br />
            sem padrão.
          </h1>

          <p className="subtitle">
            Moletons, calças, camisetas e regatas com identidade urbana.
          </p>

          <div className="hero-actions">
            <Link to="/products">
              <button>Explorar coleção</button>
            </Link>

            <Link to="/products">Ver lançamentos</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}

      <section className="categories">
        <div className="section-header">
          <span>CATEGORIAS</span>

          <h2>Explore nossa coleção</h2>

          <p>Escolha a categoria e encontre as peças ideais para seu estilo.</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category}>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS */}

      <section className="products">
        <div className="section-header">
          <span>PRODUTOS</span>

          <h2>Produtos em destaque</h2>

          <p>
            Produtos cadastrados pelo administrador aparecem aqui
            automaticamente.
          </p>
        </div>

        {loading && <p className="feedback">Carregando produtos...</p>}

        {error && <p className="feedback error">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="empty-products">
            <h3>Nenhum produto cadastrado ainda.</h3>

            <p>
              Quando o administrador cadastrar produtos, eles aparecerão aqui.
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>

                <span className="promo">{product.category}</span>

                <h3>{product.name}</h3>

                <p>
                  {Number(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-brand">
          <h2>SwagWear</h2>

          <p>Streetwear sem padrão.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Produtos</Link>
        </div>

        <p className="footer-copy">
          © 2026 SwagWear. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default Home;
