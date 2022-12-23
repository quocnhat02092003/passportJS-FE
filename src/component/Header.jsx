import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import image from "../image/5884bc985d3a4dd28ea8f1e1f573f055-removebg-preview.png"
import axios from 'axios';

function Header() {
  const navigation = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  async function logOut() {
    const response = await axios.get("http://localhost:4000/user/logout")
    if (response.data.success == true) {
      navigation("/login")
      localStorage.clear()
    }
  }
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/"><img src={image} className="image-me" width="150px" height="150px"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Blog
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-items-center flex-grow-1 me-5">
                  <Nav.Link as={Link} to="/" ><Button variant='outline-success'>Home</Button></Nav.Link>
                  {!user && <Nav.Link as={Link} to="/login" ><Button variant="outline-danger">Login</Button>
                  </Nav.Link>}
                  {!user && <Nav.Link as={Link} to="/register" ><Button variant="outline-dark" className='button-register-home'>Register</Button></Nav.Link>}
                  {user && <NavDropdown className='dropbtn'
                    menuVariant="dark"
                    title={`Hello, ${user.name}`}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item as={Link} to="/upload-blog">Upload Blog</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/my-blog">My Blog</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/my-account" >My Account
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} onClick={logOut} >Sign out
                    </NavDropdown.Item>
                  </NavDropdown>}
                </Nav>
                <Form className="d-none">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;