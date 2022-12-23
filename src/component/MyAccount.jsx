import React, { useState } from 'react'
import Header from './Header'
import { Form, Button } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const MyAccount = () => {
    const [verified, setVerified] = useState(false)
    function onChange() {
        setLoading(false)
        setVerified(true)
    }
    const [isLoading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const [show, setShow] = useState(false)
    const [notification, setNotifications] = useState('')
    const [newUser, setNewUser] = useState({
        username: user.username,
        password: "",
        newpassword: "",
        confirmpassword: ""
    })
    async function handleChangeAccount(e) {
        setLoading(true)
        e.preventDefault()
        if (newUser.newpassword == newUser.confirmpassword) {
            const response = await axios.post(`http://localhost:4000/user/my-account/${user._id}`, newUser)
            if (response.data.success == true) {
                setNewUser({
                    ...newUser,
                    username: "",
                    password: "",
                    newpassword: "",
                    confirmpassword: ""
                })
                setLoading(false)
                setNotifications(response.data.message)
                setShow(true)
            }
            else {
                setLoading(false)
                setNotifications(response.data.message)
                setShow(true)
            }
        }
        else {
            setLoading(false)
            setNotifications('Vui lòng nhập trùng NewPassword và ConfirmPassword')
            setShow(true)
        }

    }
    return (
        <div>
            <Header />
            <div className="my-account">
                <Form className='container mt-5' onSubmit={handleChangeAccount} >
                    <h1>Setting Account</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control defaultValue={user.username} disabled name='username' placeholder="Username" />
                        <Form.Text className="text-muted">
                            Currently, you can't change the username
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control value={newUser.password} onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                password: e.target.value
                            })
                        }} name='password' type="password" minLength={6} required placeholder="New Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control value={newUser.newpassword} onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                newpassword: e.target.value
                            })
                        }} name='password' type="password" minLength={6} required placeholder="New Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control value={newUser.confirmpassword} onChange={(e) => {
                            setNewUser({
                                ...newUser,
                                confirmpassword: e.target.value
                            })
                        }} name='password' type="password" minLength={6} required placeholder="Confirm New Password" />
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
                        {isLoading ? 'Loading…' : 'Update Account'}
                    </Button>
                </Form>
            </div>
            <div className="toast-notification">
                <ToastContainer position="bottom-end" className="p-3">
                    <Toast onClose={() => setShow(false)} show={show} delay="5000" autohide >
                        <Toast.Header>
                            <img
                                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-hai-1.jpg"
                                className="rounded me-2" width="20" height="20"
                            />
                            <strong className="me-auto">My Account Blogs - Notifications</strong>
                            <small className="text-muted">just now</small>
                        </Toast.Header>
                        <Toast.Body>{notification}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </div>
    )
}

export default MyAccount 