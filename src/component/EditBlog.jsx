import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const location = useLocation()
    const navigation = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const blog = JSON.parse(localStorage.getItem("blog"))
    const obj = Object.assign({}, blog)
    const [object, SetObject] = useState(obj)
    const [FullBlog, setFullBlog] = useState({
        titleblog: "",
        contentblog: "",
        imageblog: "",
        author: ""
    })
    useEffect(() => {
        async function getBlogForEdit() {
            const getBlog = await axios.get(`http://localhost:4000/user/getblog${location.pathname}`)
            if (getBlog.data.success == true) {
                setFullBlog({
                    ...FullBlog,
                    titleblog: getBlog.data.data.titleblog,
                    contentblog: getBlog.data.data.contentblog,
                    imageblog: getBlog.data.data.imageblog,
                    author: getBlog.data.data.author
                })
            }
        }
        getBlogForEdit()
    }, [])
    async function editBlog(e) {
        // console.log(obj)
        e.preventDefault()
        const response = await axios.put(`http://localhost:4000/user${location.pathname}`, FullBlog)
        if (response.data.success) {
            navigation("/my-blog")
        }
    }
    return (
        <div>
            <Header />
            <div className="container">
                <h1>Edit blogs</h1>
                <div className="edit-content-blog">
                    <Form onSubmit={editBlog}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title blogs</Form.Label>
                            <Form.Control value={FullBlog.titleblog} autoComplete="off" onChange={(e) => {
                                setFullBlog({
                                    ...FullBlog,
                                    titleblog: e.target.value
                                })
                            }} type="text" name='titleblog' placeholder="Title blogs" />
                            <Form.Text className="text-muted">

                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Blogs Images Link</Form.Label>
                            <Form.Control value={FullBlog.imageblog} autoComplete="off" onChange={(e) => {
                                setFullBlog({
                                    ...FullBlog,
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
                            <Form.Control value={FullBlog.contentblog} autoComplete="off" onChange={(e) => {
                                setFullBlog({
                                    ...FullBlog,
                                    contentblog: e.target.value
                                })
                            }} name='contentblog' as="textarea" />
                        </FloatingLabel>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control value={user.name} disabled
                                onChange={(e) => {
                                    setFullBlog({
                                        ...FullBlog,
                                        author: e.target.value
                                    })
                                }}
                                type="text" name='author' placeholder="Author" />
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditBlog