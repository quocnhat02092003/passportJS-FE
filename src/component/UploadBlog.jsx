import React, { useEffect, useState } from 'react'
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate, Link } from 'react-router-dom';

const UploadBlog = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigation = useNavigate()
    const [blog, setBlog] = useState({
        titleblog: "",
        imageblog: "",
        contentblog: "",
        author: user.name
    })
    const [show, setShow] = useState(false)
    const [notificationUpload, SetNotificationUpload] = useState("")
    async function uploadBlogs(e) {
        e.preventDefault()
        const response = await axios.post("http://localhost:4000/user/upload-blog", blog, {
            withCredentials: true
        })
        try {
            if (response.data.success == true) {
                navigation("/")
            }
            else {
                SetNotificationUpload(response.data.message)
                setShow(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="upload-blog">
                    <h1>Upload Blog</h1>
                </div>
                <div className="content-upload-blog">
                    <Form onSubmit={uploadBlogs}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title blogs</Form.Label>
                            <Form.Control autoComplete="off" onChange={(e) => {
                                setBlog({
                                    ...blog,
                                    titleblog: e.target.value
                                })
                            }} type="text" name='titleblog' placeholder="Title blogs" />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Blogs Images Link</Form.Label>
                            <Form.Control autoComplete="off" onChange={(e) => {
                                setBlog({
                                    ...blog,
                                    imageblog: e.target.value
                                })
                            }} type="text" name='imageblog' placeholder="Blogs Images Link: http//...." />
                        </Form.Group>
                        <Form.Label>Content Blogs</Form.Label>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Content Blogs"
                            className="mb-3"
                        >
                            <Form.Control autoComplete="off" onChange={(e) => {
                                setBlog({
                                    ...blog,
                                    contentblog: e.target.value
                                })
                            }} name='contentblog' as="textarea" />
                        </FloatingLabel>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control value={user.name} disabled
                                // onChange={(e) => {
                                //     setBlog({
                                //         ...blog,
                                //         author: e.target.value
                                //     })
                                // }}
                                type="text" name='author' placeholder="Author" />
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay="5000" autohide >
                    <Toast.Header>
                        <img
                            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-hai-1.jpg"
                            className="rounded me-2" width="20" height="20"
                        />
                        <strong className="me-auto">Upload to Blogs - Notifications</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notificationUpload}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default UploadBlog;