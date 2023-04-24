import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import '../styles/productdetails.css'
import ProductList from '../components/UI/ProductList'
import { cartActions } from '../redux/slice/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ProductDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const product = products.find(item => item.id === id)
    const{imgUrl,productName,price,avgRating,shortDesc,category} = product

    const relatedProducts = products.filter(item => item.category === category)

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                image:imgUrl,
                productName,
                price
            })
        )
        toast.success("Product added to the Cart")
    }
  return (
    <>
    <Helmet title = {productName}>
        <CommonSection title = {productName} />
        <section className='pt-0'>
            <Container>
                <Row>
                    <Col lg = "6">
                        <img src={imgUrl} alt="" />
                    </Col>
                    <Col lg = "6">
                        <div className="product__details">
                            <h2>{productName}</h2>
                            <div className="product__rating d-flex align-items-center gap-5 mb-2">
                                <div>
                                    <span><i class="ri-star-s-fill"></i></span>
                                    <span><i class="ri-star-s-fill"></i></span>
                                    <span><i class="ri-star-s-fill"></i></span>
                                    <span><i class="ri-star-s-fill"></i></span>
                                    <span><i class="ri-star-half-fill"></i></span>
                                </div>
                                <p>({avgRating}Ratings)</p>
                            </div>
                            <div className='d-flex align-items-center gap-5'>
                            <span className='product__price'>${price}</span>
                            <span>Category:{category.toUpperCase()}</span>
                            </div>
                            <p>{shortDesc}</p>
                            <button className="buy__button" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    {/* <Col lg = "12">
                        <div className="tab__wrapper d-flex align-items-center gap-5">
                            <h6 className={`${tab === "desc" ? "active__tab" : " "}`} onClick={() => setTab('desc')}>Description</h6>
                            <h6 className={`${tab === "rev" ? "active__tab" : " "}`} onClick={() => setTab('rev')}>Reviews({reviews.length})</h6>
                        </div>
                        {
                            tab === "desc" ? 
                                <div className="tab__content mt-5">
                                    <p>{description}</p>
                                </div>
                            : 
                            <div className='product__review'>
                                <div className="review__wrapper">
                                    <ul>
                                        {
                                            reviews.map((item,index) => (
                                                <li key = {index}>
                                                    <span>{item.rating}(rating)</span>
                                                    <p>{item.text}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>   
                        }
                    </Col> */}
                    <Col lg = "12" className='mt-0'>
                        <h2 className='related__title'>You might also like....</h2>
                    </Col>
                    <ProductList data = {relatedProducts} />
                </Row>
            </Container>
        </section>
    </Helmet>
    </>
  )
}

export default ProductDetails