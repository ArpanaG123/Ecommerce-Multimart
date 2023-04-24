import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import hero_image from "../assets/images/hero-img.png";
import products from "../assets/data/products";
import "../styles/home.css";
import { Link } from "react-router-dom";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductList";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const[mobileProducts,setMobileProducts] = useState([]);
  const[wirelessProducts,setWirelessProducts] = useState([]);

  const year = new Date().getFullYear;

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
        (item) => item.category === "mobile"
    );

    const filteredWirelessProducts = products.filter(
        (item) => item.category === "wireless"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
  }, []);

  return (
    <>
      <Helmet title={"Home"}>
        <section className="hero__section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <p className="hero__subtitle">Trending product in {year}</p>
                  <h2>Better way to start the shopping</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, mollitia! Quo doloribus vero numquam, quidem
                    dolore neque incidunt consequatur ipsam!!
                  </p>
                  <button className="buy__button">
                    <Link to="/shop">Shop Now</Link>
                  </button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={hero_image} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Trending Products</h2>
              </Col>
              <ProductList data={trendingProducts} />
            </Row>
          </Container>
        </section>
        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Best Sales</h2>
              </Col>

              <ProductList data={bestSalesProducts} />
            </Row>
          </Container>
        </section>
        <section className="new__arrivals">
          <Container>
            <Row>
                <Col lg="12" className="text-center">
                    <h2 className="section__title">New Arrivals</h2>
                </Col>
                <ProductList data={mobileProducts} />
                <ProductList data={wirelessProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Home;
