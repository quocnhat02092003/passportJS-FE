import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ReCAPTCHA from 'react-google-recaptcha';


function Register() {
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState("")
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: ""
  })
  const [verified, setVerified] = useState(false)
  const navigation = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/user/register", user)
      if (response.data.success === false) {
        setNotification(response.data.message);
        setShow(true)
      }
      else if (response.data.success === true) {
        navigation("/login")
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }
  function onChange() {
    setVerified(true)
  }
  return (
    <div className="register">
      <Header />
      <Form className='container mt-5' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control autoComplete='off' name='name' placeholder="Name" onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          } />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control autoComplete='off' name='username' placeholder="Username" onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value
            })
          }} />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' autoComplete='off' name='password' placeholder="Password" onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })} />
        </Form.Group>

        <ReCAPTCHA className="d-block mb-3"
          sitekey="6Lc86X8jAAAAAKPkTtc0txCT0zIDlaLLTmC9wP8Z"
          size='normal'
          onChange={onChange}
        />

        <Button className='d-block' variant="success" type="submit" disabled={!verified}>
          Register
        </Button>
        <div className="d-flex align-items-center gap-2">
          <span >If you have an account?</span>
          <Button as={Link} to="/login" variant="outline-success" size="sm">
            Login Now
          </Button>
        </div>
      </Form>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay="3000" autohide >
          <Toast.Header>
            <img
              src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-hai-1.jpg"
              className="rounded me-2" width="25" height="25"
            />
            <strong className="me-auto">Register to Blogs - Notifications</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notification}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </div>
  );
}

export default Register;
