import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [isLoading, setLoading] = useState(false);
  const [notificationLogin, setNotificationLogin] = useState("")
  const navigation = useNavigate();
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const [verified, setVerified] = useState(false)
  function onChange() {
    setLoading(false)
    setVerified(true)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("http://localhost:4000/user/login", user, {
        withCredentials: true
      })

      // if (response.data.success === false) {
      //   setNotificationLogin(response.data.message)
      //   setShow(true)
      // }
      if (response.data.success === true) {
        setNotificationLogin(response.data.message)
        setUser({
          username: "",
          password: ""
        })
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setLoading(false)
        navigation("/");
      }
    }
    catch (error) {
      setLoading(false)
      if (error) {
        setNotificationLogin("Sai tài khoản hoặc mật khẩu")
        setShow(true)
      }
    }
  }

  return (
    <div className='login'>
      <Header />
      <Form className='container mt-5' onSubmit={handleLogin}>
        <h1>Login</h1>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={(e) => setUser({
            ...user,
            username: e.target.value
          }
          )} name='username' placeholder="Username" />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })} name='password' type="password" placeholder="Password" />
        </Form.Group>
        <ReCAPTCHA className="d-block mb-3"
          sitekey="6Lc86X8jAAAAAKPkTtc0txCT0zIDlaLLTmC9wP8Z"
          size='normal'
          onChange={onChange}
        />
        <Button
          variant="primary"
          type='submit'
          disabled={isLoading || !verified}
        >
          {isLoading ? 'Loading…' : 'Login'}
        </Button>
        <div className="d-flex align-items-center gap-2">
          <span >If you don't have an account?</span>
          <Button as={Link} to="/register" variant="outline-danger" size="sm">
            Register Now
          </Button>
        </div>
      </Form>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay="3000" autohide >
          <Toast.Header>
            <img
              src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-hai-1.jpg"
              className="rounded me-2" width="20" height="20"
            />
            <strong className="me-auto">Login to Blogs - Notifications</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notificationLogin}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </div>
  );
}

export default Login;