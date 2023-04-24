import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase.config'
import {toast} from 'react-toastify'


const Login = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()


    const signIn = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            const user = userCredential.user
            console.log(user);
            setLoading(false)
            toast.success("Logged in successfully")
            navigate("/shop")
            
        } catch (error) {
            setLoading(false)
            toast.error(error.message)    
        }
    }

  return (
    <Helmet title = "login">
        <section>
            <Container>
                <Row>
                    {
                        loading ? <h1>loading....</h1> : <Col lg = "6" className='m-auto text-center'>
                        <h3 className='fs-4 fw-bold'>Login</h3>
                        <Form className='auth__form' onSubmit={signIn}>
                            <FormGroup className='form__group1'>
                                <input type="email" placeholder='Enter your email' className='input1' value = {email} onChange={(e) => setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup className='form__group1'>
                                <input type="password" placeholder='Enter your password' className='input1' value = {password} onChange={(e) => setPassword(e.target.value)} />
                            </FormGroup>
                            <button className='buy__button auth__btn' type = "submit">Login</button>
                            <p>Don't have an account <Link to = "/signup">Create an account</Link></p>
                        </Form>
                    </Col>
                    }
                </Row>
            </Container>
        </section>

    </Helmet>
  )
}

export default Login