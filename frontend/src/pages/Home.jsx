import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>

        <title>
          SYPSY | Lo que querés ya
        </title>

        <meta
          name="description"
          content="SYPSY es el marketplace donde podés comprar, vender y participar de un ecosistema con recompensas RSPY."
        />

        <meta
          name="keywords"
          content="SYPSY, marketplace, comprar, vender, productos, servicios, RSPY, recompensas"
        />

        <meta
          property="og:title"
          content="SYPSY | Lo que querés ya"
        />

        <meta
          property="og:description"
          content="Comprá, vendé y participá en el ecosistema SYPSY."
        />

        <meta
          property="og:url"
          content="https://www.sypsy.com.ar"
        />

        <meta
          property="og:type"
          content="website"
        />

      </Helmet>


      <main className="home-page">


        {/* =====================================
            HERO
        ====================================== */}

        <section className="home-hero">

          <div className="home-hero-content">

            <span className="home-eyebrow">
              EL MARKETPLACE QUE TE CONECTA
            </span>

            <h1>
              <strong>SYPSY</strong>
              <span>LO QUE QUERÉS YA!</span>
            </h1>

            <p className="home-hero-text">

              Un lugar para encontrar productos y servicios,
              vender lo que ofrecés y formar parte de una comunidad
              donde <strong>participar también tiene recompensa.</strong>

            </p>


            <div className="home-hero-actions">

              <Link
                to="/productos"
                className="home-btn home-btn-primary"
              >
                Explorar SYPSY
                <span>→</span>
              </Link>


              <Link
                to="/register"
                className="home-btn home-btn-secondary"
              >
                Quiero vender
              </Link>

            </div>


            <div className="home-hero-note">

              <span>✓</span>
              Comprá · Vendé · Participá · Recibí recompensas

            </div>

          </div>


          <div className="home-hero-visual">

            <div className="home-floating-card home-card-main">

              <div className="home-card-icon">
                🛍️
              </div>

              <div>
                <strong>
                  Comprá y vendé
                </strong>

                <span>
                  Todo en un mismo lugar
                </span>
              </div>

            </div>


            <div className="home-floating-card home-card-rspy">

              <div className="home-rspy-icon">
                🪙
              </div>

              <div>
                <strong>
                  RSPY
                </strong>

                <span>
                  Recompensas SYPSY
                </span>
              </div>

            </div>


            <div className="home-orbit">

              <span>SYPSY</span>

            </div>

          </div>

        </section>



        {/* =====================================
            QUÉ ES SYPSY
        ====================================== */}

        <section className="home-section home-about">

          <div className="home-section-heading">

            <span className="home-section-label">
              CONOCÉ SYPSY
            </span>

            <h2>
              Mucho más que un lugar para comprar
            </h2>

            <p>
              SYPSY conecta personas, vendedores, emprendedores
              y oportunidades en un mismo ecosistema.
            </p>

          </div>


          <div className="home-about-grid">

            <article className="home-info-card">

              <div className="home-info-icon">
                🔎
              </div>

              <h3>
                Encontrá
              </h3>

              <p>
                Buscá productos y servicios de distintos vendedores
                desde un mismo lugar.
              </p>

            </article>


            <article className="home-info-card">

              <div className="home-info-icon">
                🛒
              </div>

              <h3>
                Comprá
              </h3>

              <p>
                Elegí lo que necesitás, generá tu pedido y seguí
                el proceso desde tu cuenta.
              </p>

            </article>


            <article className="home-info-card">

              <div className="home-info-icon">
                🚀
              </div>

              <h3>
                Vendé
              </h3>

              <p>
                Publicá tus productos, recibí pedidos y gestioná
                tus ventas desde SYPSY.
              </p>

            </article>

          </div>

        </section>



        {/* =====================================
            CÓMO FUNCIONA
        ====================================== */}

        <section
          className="home-section home-how"
          id="como-funciona"
        >

          <div className="home-section-heading">

            <span className="home-section-label">
              SIMPLE Y DIRECTO
            </span>

            <h2>
              ¿Cómo funciona SYPSY?
            </h2>

            <p>
              Diseñamos el proceso para que encontrar,
              comprar o vender sea lo más simple posible.
            </p>

          </div>


          <div className="home-steps">


            <article className="home-step">

              <div className="home-step-number">
                01
              </div>

              <div className="home-step-icon">
                🔍
              </div>

              <h3>
                Buscá
              </h3>

              <p>
                Explorá las categorías y encontrá
                lo que necesitás.
              </p>

            </article>


            <article className="home-step">

              <div className="home-step-number">
                02
              </div>

              <div className="home-step-icon">
                👤
              </div>

              <h3>
                Elegí
              </h3>

              <p>
                Conocé el producto, al vendedor y
                las opciones disponibles.
              </p>

            </article>


            <article className="home-step">

              <div className="home-step-number">
                03
              </div>

              <div className="home-step-icon">
                💳
              </div>

              <h3>
                Comprá
              </h3>

              <p>
                Generá tu pedido y realizá el proceso
                de pago correspondiente.
              </p>

            </article>


            <article className="home-step">

              <div className="home-step-number">
                04
              </div>

              <div className="home-step-icon">
                🎁
              </div>

              <h3>
                Participá
              </h3>

              <p>
                Comprando o vendiendo podés formar parte
                del sistema de recompensas RSPY.
              </p>

            </article>

          </div>

        </section>



        {/* =====================================
            RSPY
        ====================================== */}

        <section className="home-rspy-section">

          <div className="home-rspy-content">

            <span className="home-section-label home-rspy-label">
              ECOSISTEMA SYPSY
            </span>

            <h2>
              🪙 RSPY
            </h2>

            <h3>
              Participar en SYPSY tiene recompensa.
            </h3>

            <p>

              RSPY es nuestro sistema de recompensas.
              La idea es reconocer la participación dentro
              del ecosistema SYPSY.

            </p>

            <p>

              <strong>
                Comprar y vender en SYPSY puede permitirte
                recibir recompensas RSPY,
              </strong>

              de acuerdo con las reglas y condiciones
              establecidas por la plataforma.

            </p>


            <div className="home-rspy-benefits">

              <div>
                <span>🛍️</span>
                <strong>
                  Compradores
                </strong>
                <small>
                  Participan del sistema de recompensas.
                </small>
              </div>


              <div>
                <span>🏪</span>
                <strong>
                  Vendedores
                </strong>
                <small>
                  También pueden recibir recompensas
                  por su actividad.
                </small>
              </div>


              <div>
                <span>🌐</span>
                <strong>
                  Comunidad
                </strong>
                <small>
                  Más participación, más posibilidades
                  dentro del ecosistema.
                </small>
              </div>

            </div>

          </div>

          <div className="home-rspy-visual">

            <div className="home-rspy-coin">
              <span>RSPY</span>
            </div>

            <div className="home-rspy-ring ring-one"></div>
            <div className="home-rspy-ring ring-two"></div>

          </div>

        </section>



        {/* =====================================
            PARA VENDEDORES
        ====================================== */}

        <section className="home-section home-seller">

          <div className="home-seller-content">

            <span className="home-section-label">
              ¿QUERÉS VENDER?
            </span>

            <h2>
              Convertí lo que ofrecés
              en una oportunidad.
            </h2>

            <p>

              Publicá tus productos o servicios,
              gestioná tus ventas y aprovechá las
              herramientas que SYPSY pone a tu disposición.

            </p>


            <div className="home-seller-list">

              <div>
                <span>✓</span>
                Publicá tus productos
              </div>

              <div>
                <span>✓</span>
                Recibí y gestioná pedidos
              </div>

              <div>
                <span>✓</span>
                Accedé a promociones y herramientas
              </div>

              <div>
                <span>✓</span>
                Participá del sistema RSPY
              </div>

            </div>


            <Link
              to="/register"
              className="home-btn home-btn-primary"
            >
              Crear mi cuenta
              <span>→</span>
            </Link>

          </div>


          <div className="home-seller-panel">

            <div className="home-panel-top">
              <span>MI ACTIVIDAD</span>
              <span className="home-panel-status">
                SYPSY
              </span>
            </div>

            <div className="home-panel-line"></div>

            <div className="home-panel-items">

              <div>
                <span>📦</span>
                <strong>
                  Productos
                </strong>
              </div>

              <div>
                <span>🛍️</span>
                <strong>
                  Ventas
                </strong>
              </div>

              <div>
                <span>🪙</span>
                <strong>
                  RSPY
                </strong>
              </div>

            </div>

          </div>

        </section>



        {/* =====================================
            CTA FINAL
        ====================================== */}

        <section className="home-final-cta">

          <span>
            SYPSY
          </span>

          <h2>
            Lo que querés, ya.
          </h2>

          <p>
            Descubrí productos, encontrá oportunidades,
            vendé lo que ofrecés y formá parte del ecosistema SYPSY.
          </p>


          <div className="home-final-actions">

            <Link
              to="/productos"
              className="home-btn home-btn-light"
            >
                Explorar SYPSY
              <span>→</span>
            </Link>


            <Link
              to="/register"
              className="home-btn home-btn-outline"
            >
              Registrarme
            </Link>

          </div>

        </section>


      </main>
    </>
  );
}

export default Home;