import React, { useState } from 'react'
//import { useDispatch } from 'react-redux';
//import { register } from '../actions/userActions';
import axios from 'axios'
import signup from '../media/signup.png'
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../media/kids_first_logo_beta.png'
import './register.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  //const [is_parent, setIs_parent] = useState(true)

  console.log('email is ', email)
  console.log('password is ', password)

  function handleRegister(e) {
    e.preventDefault()

    console.log('email is ', email)
    console.log('password is ', password)

    axios
      .post('http://localhost:8000/api/register', { email, password })
      // next page should - give a family name
      .then((res) => {
        console.log('success')
        // need to store the user informatin in the session
        const user = JSON.stringify(res.data)
        localStorage.setItem('storedUser', user)
        window.location.href = '/family'
      })
      .catch((e) => {
        console.log(e.response.data.message)
        setError(e.response.data.message)
      })
    // then firstname, last name ... fill out the information .
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/">
          <img src={logo} className="logo" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-text">
            Already a member? <a href="/Signin">Log in</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={signup} alt="spaceship" />
        </div>

        <div className="form-content-right">
          <form className="form" onSubmit={handleRegister}>
            <h1 className="form-title">Register Kids First</h1>

            <div className="form-inputs">
              <label className="form-label mt-4">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="password2"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="form-input-btn"
              disabled={!(email && password && confirmPassword)}
              type="submit"
            >
              <p className="signup-form">Register</p>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
