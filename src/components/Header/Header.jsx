import React, { useRef } from 'react'
import './header.css'
import { Container,Row } from 'reactstrap'
import user_icon from '../../assets/images/user-icon.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuth from '../../custom-hook/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'

const nav_links = [
    {
        path:'home',
        display:"Home"
    },
    {
        path:'shop',
        display:"Shop"
    },
    {
        path:'cart',
        display:"Cart"
    }
]


const Header = () => {

    const profileActionRef = useRef(null)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const {currentUser} = useAuth()

    const navigateToCart = () => {
        navigate("/cart")
    }
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Logout successfully")
            navigate("/home")
        }).catch(error => {
            toast.error(error.message)
        })
    }
  return (
    <>
    <Container>
        <Row>
            <div className="nav__wrapper">
                <div className="logo">
                <i class="ri-shopping-cart-fill"></i>
                    <div>
                        <h1>Ecommerce App</h1>
                    </div>
                </div>
                <div className="navigation" ref = {menuRef} onClick={menuToggle}>
                    <ul className='menu'>
                       {
                        nav_links.map((item,index) => (
                            <li className='nav__item' key={index}>
                                <NavLink to = {item.path} className={(navClass) => navClass.isActive ?  'nav__active' : " "}>{item.display}</NavLink>
                            </li>
                        ))
                       }
                    </ul>
                </div>
                <div className="nav__icons">
                    <span className='fav__icon'><i class="ri-heart-line"></i>
                    <span className='badge'>2</span></span>
                    <span className='cart__icon' onClick={navigateToCart}><i class="ri-shopping-cart-2-line"></i>
                    <span className='badge'>{totalQuantity}</span></span>
                    <div>
                    <span><img src={currentUser ? currentUser.photoURL :user_icon} alt="" onClick={toggleProfileActions} /></span>
                    </div>
                    <div className='profile__actions' ref ={profileActionRef}  onClick={toggleProfileActions}>
                        {
                            currentUser ? <span onClick={logout}>Logout</span> : <div className='d-flex align-items-center justify-content-center flex-column'>
                                <Link to = "/signup">SignUp</Link>
                                <Link to = "/login">Login</Link>
                            </div>
                        }

                    </div>
                    <div className="mobile__menu">
                    <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
                </div>
                </div>
            </div>
        </Row>
    </Container>
    </>
  )
}

export default Header