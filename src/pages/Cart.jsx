import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import '../styles/cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/slice/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {

  const totalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <Helmet title = "Cart">
      <CommonSection  title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {
                cartItems.length === "0" ? (<h1 className='fs-4 text-center'>No Items are added to the cart</h1>) : 
               ( <><table className='table__bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th >Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems.map((item,index) => (
                      <Tr item = {item} key = {index} />

                    ))
                  }
                </tbody>
              </table></>)
              }
            </Col>
            <Col lg = "3">
              <div>
                <h6 className='d-flex align-items-center justify-content-between mt-5'>SubTotal
                <span className='fs-4 fw-bold'>${totalAmount}</span></h6>
              </div>
              <p className='fs-6 mt-3'>Taxes & Shipping will calculate in checkout</p>
              <div>
                <button className='buy__button w-100'>
                  <Link to = "/checkout">Checkout</Link>
                </button>
                <button className='buy__button w-100'>
                  <Link to = "/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

const Tr = ({item}) => {
  const dispatch = useDispatch()

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return<tr>
    <td>
      <img src={item.imgUrl} alt="" />
    </td>
    <td>{item.productName}</td>
    <td>${item.price}</td>
    <td>{item.quantity}</td>
    <td onClick={deleteProduct}><i class="ri-delete-bin-6-line"></i></td>
  </tr>
}

export default Cart