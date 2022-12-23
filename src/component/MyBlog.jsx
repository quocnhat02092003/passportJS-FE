import React, { useState, useEffect } from 'react'
import Header from './Header'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const MyBlog = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIndexBlog(id);
    };
    const [indexBlog, setIndexBlog] = useState(0);
    useEffect(() => {
        const getMyBlog = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user/my-blogs", {
                    withCredentials: true
                })
                if (response.data.success) {
                    setData(response.data.data)
                }
                else {
                    console.log("Null")
                }
            }
            catch {
                console.log("Error")
            }
        }
        getMyBlog();
    }, [])
    async function handleDeleted() {
        const response = await axios.delete(`http://localhost:4000/user/delete-blog/${indexBlog}`, { withCredentials: true })
        if (response.data.success === true) {
            setShow(false)
            setData(data.filter((data) => indexBlog !== data._id))
        }
    }
    return (
        <div>
            <Header />
            <div className="my-blog container">
                <div className="me-blog">
                    <h1>My blogs</h1>
                </div>
                <div className="data-blog-me">
                    <Table striped bordered="true">
                        <thead>
                            <tr>
                                <th>TT</th>
                                <th>Title Blog</th>
                                <th>Link image</th>
                                <th>Content</th>
                                <th>Author</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        {data.map((datas, index) => {
                            return (
                                <tbody key={index} tbody="true" >
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{datas.titleblog}</td>
                                        <td>{datas.imageblog}</td>
                                        <td>{datas.contentblog}</td>
                                        <td>{datas.author}</td>
                                        <td className='d-block justify-content-center gap-2'>
                                            <Button as={Link} to={{ pathname: `/edit/${datas._id}`, state: { data: datas } }} variant="outline-success">Edit</Button>
                                            <Button
                                                onClick={() => handleShow(datas._id)}
                                                variant="outline-danger">Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Deleted Blogs</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure to delete blog? You can't restore blog deleted....</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleDeleted}>
                                    Deleted
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Table>
                </div>
            </div>
        </div >
    )
}

export default MyBlog