import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row,Col, Form, FormGroup } from 'reactstrap'
import '../styles/checkout.css'
import { useDispatch, useSelector } from 'react-redux'
import {cartActions} from '../redux/slice/cartSlice.js'

const Checkout = () => {
    const dispatch = useDispatch()
    const totalQty = useSelector(state => state.cart.totalQuantity)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    const orderPlaced = () => {
        if(totalAmount>0){
            dispatch(cartActions.clearCart());
        }
    }
  return (
    <>
    <Helmet title = "Checkout">
        <CommonSection title = "Checkout" />
        <section>
        <Container>
            <Row>
                <Col lg = "8">
                    <h6 className='mb-4 fw-bold'>Billing Information</h6>
                    <Form className='billing__form'>
                        <FormGroup className='form__group'>
                            <input type="text" placeholder='Enter your name' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="email" placeholder='Enter your email' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="number" placeholder='Phone Number' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="text" placeholder='street Address' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="text" placeholder='Postal Code' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="text" placeholder='City' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type="text" placeholder='Country' />
                        </FormGroup>
                    </Form>
                </Col>
                <Col lg = "4">
                    <div className="checkout__cart">
                        <h6>Total Quantity:<span>{totalQty}items</span></h6>
                        <h6>SubTotal:<span>${totalAmount}</span></h6>
                        <h6><span>
                            shipping:<br/> free shipping</span><span>$0</span></h6>
                        <h4>Total Cost :<span>${totalAmount}</span></h4>
                        <button className="auth__btn" onClick={() => orderPlaced()}>Place an order</button>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>
    </Helmet>

    </>
  )
}

export default Checkout