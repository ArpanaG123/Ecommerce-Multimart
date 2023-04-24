import React from 'react'
import './footer.css'
import { Container,Row,Col } from 'reactstrap'

const Footer = () => {
  return (
    <footer className='footer'>
        <Container>
            <Row>
                <Col lg = "4" className='logoImage'>
                <div className="logonew">
                    <div>
                        <h1>My Ecommerce App</h1>
                    </div>
                </div>
                </Col>
                <p className='copyright'>copyright@arpana2022</p>
            </Row>
        </Container>

    </footer>
  )
}

export default Footer