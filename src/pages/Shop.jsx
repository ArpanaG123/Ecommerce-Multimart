import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import '../styles/shop.css'
import products from '../assets/data/products'
import ProductList from "../components/UI/ProductList";

const Shop = () => {

  const[productsData,setProductData] = useState(products)

  const handleFilter = (e) => {
    const filterVlaue = e.target.value;
    if(filterVlaue === "sofa"){
      const filteredProducts = products.filter(item => item.category === "sofa")
      setProductData(filteredProducts)
    }

    if(filterVlaue === "mobile"){
      const filteredProducts = products.filter(item => item.category === "mobile")
      setProductData(filteredProducts)
    }

    if(filterVlaue === "watch"){
      const filteredProducts = products.filter(item => item.category === "watch")
      setProductData(filteredProducts)
    }

    if(filterVlaue === "chair"){
      const filteredProducts = products.filter(item => item.category === "chair")
      setProductData(filteredProducts)
    }

    if(filterVlaue === "wireless"){
      const filteredProducts = products.filter(item => item.category === "wireless")
      setProductData(filteredProducts)
    }
  }

  const handleSearch = (e) => {
    const serachTerm = e.target.value;

    const serachProducts = products.filter(item => item.productName.toLowerCase().includes(serachTerm.toLowerCase()))

    setProductData(serachProducts)
  }
  return (
    <>
      <Helmet title={"Shop"}>
        <CommonSection title="Products" />
        <section>
          <Container>
            <Row>
              <Col lg = "3" md = "3">
                <div className="filter__widget">
                  <select onChange={handleFilter}>
                    <option>Filter by category</option>
                    <option value="sofa">Sofa</option>
                    <option value="chair">Chair</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg = "3" md = "3">
              <div className="filter__widget">
                  <select>
                    <option>Sort by</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg = "6" md = "6">
                <div className="search__box">
                  <input type="text"  placeholder="Search........................" onChange={handleSearch}/>
                  <span><i class="ri-search-line"></i></span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              {
                productsData.length === "0" ? (<h1>No Products are found!!</h1>) : (<ProductList data = {productsData} />)
              }
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Shop;
