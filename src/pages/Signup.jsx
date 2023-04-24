import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {auth, storage} from '../firebase.config'
import { toast } from 'react-toastify'
import {setDoc,doc} from 'firebase/firestore'
import {db} from '../firebase.config'


const Signup =  () => {

    const[name,setName] = useState("")
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState("")
    const[file,setFile] = useState(null)
    const[loading,setLoading] = useState(false)

    const navigate  = useNavigate()

    const signup = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const userCredential = await  createUserWithEmailAndPassword(auth,email,password)

            const user = userCredential.user;

            const storageRef = ref(storage,`images/${Date.now() +  name}`)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on((error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await updateProfile(user,{
                        displayName:name,
                        photoURL:downloadURL
                    })

                    await setDoc(doc(db,"users",user.uid),{
                        uid:user.uid,
                        displayName:name,
                        email,
                        photoURL:downloadURL
                    })
                })
            })
            setLoading(false)
            toast.success("Account created successfully")
            navigate("/login")
        } catch (error) {
            setLoading(false)
            toast.error("Something went Wrong")  
        }
    }

  return (
    <Helmet title = "Register">
        <section>
            <Container>
                <Row>
                    {
                        loading ? <Col>Loading....</Col> : 
                        <Col lg = "6" className='m-auto text-center'>
                        <h3 className='fs-4 fw-bold'>Register</h3>
                        <Form className='auth__form' onSubmit={signup}>
                            <FormGroup className='form__group1'>
                                <input type="text" placeholder='Enter your Username' className='input1' value = {name} onChange={(e) => setName(e.target.value)} />
                            </FormGroup>
                            <FormGroup className='form__group1'>
                                <input type="email" placeholder='Enter your email' className='input1' value = {email} onChange={(e) => setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup className='form__group1'>
                                <input type="password" placeholder='Enter your password' className='input1' value = {password} onChange={(e) => setPassword(e.target.value)} />
                            </FormGroup>
                            <FormGroup className='form__group1'>
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </FormGroup>
                            <button className='buy__button auth__btn' type = "submit">Create an Account</button>
                            <p>Already have an account <Link to = "/login">Login</Link></p>
                        </Form>
                    </Col>
                    }
                </Row>
            </Container>
        </section>

    </Helmet>
  )
}

export default Signup