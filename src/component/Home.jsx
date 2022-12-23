import React, { useEffect, useState } from 'react'
import Header from "./Header"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import io from 'socket.io-client'
import Typewriter from 'typewriter-effect'

const socket = io("http://localhost:5000/")


const Home = () => {
  const smallStyle = {
    color: "red"
  };
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState([])
  const [comment, setComment] = useState({
    comment: ""
  })

  const commentBlog = (data) => {
    socket.emit('getComment', { message: comment.comment, id: data._id, nameId: data.authorId, nameUser: user.name })
    setComment({
      comment: ""
    })
  }

  useEffect(() => {
    async function getDataFromBlog() {
      try {
        const response = await axios.get("http://localhost:4000/user/blogs")
        if (response.data) {
          setData(response.data)
          localStorage.setItem("blog", JSON.stringify(response.data));
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getDataFromBlog()
  }, [])


  useEffect(() => {
    socket.on("datagetcomment", async (val) => {
      const copyBlogs = data;
      const indexBlog = data.findIndex((item) => item._id === val.id);
      if (indexBlog !== -1) {
        copyBlogs[indexBlog].comments.push({
          comment: val.message,
          nameuser: val.nameUser
        })

        setData([...copyBlogs])
      }
    })

    return function cleanup() { socket.off("datagetcomment") }
  }, [data])

  const datas = data.map((data, index) => {
    return (
      <Col key={index} md="5" sm="5" lg="5" className='box'>
        <Card className='card-home'>
          <Card.Img className='object-fit-cover' width="200px" height="250px" variant="top" src={data.imageblog} />
          <Card.Header>
            <Card.Title className='header-blog'>{data.titleblog}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {data.contentblog}
            </Card.Text>
            <Card.Text>
              Bài viết được đăng bởi: {data.author}
            </Card.Text>
            <Card.Text>
              Vào ngày: {data.createdAt}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {!user && <Card.Text className='span-comment'>
              You need a login for comment
            </Card.Text>}
            {user && <div className='submit-comment'>
              <ul id='messages'>
                {data.comments.map((item, i) => (
                  <li key={i} className='liContent'>
                    <small style={smallStyle}>{item.nameuser}</small> : <small>{item.comment}</small>
                  </li>
                ))
                }
              </ul>
              <Form onSubmit={(e) => {
                e.preventDefault(); commentBlog(data)
              }}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2">{user.name}</InputGroup.Text>
                  <Form.Control
                    id='input-comment-content'
                    placeholder="Comment..."
                    name='comment'
                    required
                    onChange={(e) => setComment({
                      ...comment,
                      comment: e.target.value
                    })}
                  />
                  <Button variant="outline-secondary" id="button-addon2" type='submit'
                  >
                    Comment
                  </Button>
                </InputGroup>
              </Form>
            </div>
            }

          </Card.Footer>
        </Card>
      </Col>
    )
  }
  )

  return (
    <div>
      <Header data={data} />
      <div className="container">
        <div className="typewriter">
          <div>Blogs - </div>
          <div className='d-inline-block'><Typewriter
            options={{
              autoStart: true,
              loop: true
            }}
            onInit={(typewriter) => {
              typewriter.typeString('<strong><span style="color:red;">Read</span> to <span style="color:Blue;">knows</span</strong>')
                .start()
                .pauseFor(2000)
                .deleteChars(13)
              typewriter.typeString('<strong><span style="color:red;">Read</span> to <span style="color:green;">experience</span</strong>')
                .start()
                .pauseFor(2000)
                .deleteChars(18)
              typewriter.typeString('<strong><span style="color:red;">Expand </span> <span style="color:blue;">knowledge</span></strong>')
                .start()
                .pauseFor(2000)
                .deleteAll()
            }}
          ></Typewriter>
          </div>
        </div>
        <div className="content-blog mt-5">
          {datas}
        </div>
      </div>
    </div >
  )

}

export default Home