import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.css";
import logo from "../Navbar/icons8-health-64.png";
import "../Css/Navbar.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

function TopNavbar() {

  const navigate = useNavigate()
  const location = useLocation()

  const [propt, setpropert] = useState(localStorage.getItem("name")) 
  const [signup, isSignup] = useState(false)

  useEffect(() => { 
    setpropert(localStorage.getItem("name"))
    if (localStorage.getItem("name") !== null ){
      isSignup(true)
    }
    if (localStorage.getItem("name") === ''){
      isSignup(false)
    }
  }, [setpropert, location])

  //console.log(localStorage.getItem('properties').length)
    const [isHidden, setIsHidden] = useState(false);
  
    useEffect(() => {
      if (location.pathname === '/Login') {
        setIsHidden(true);
      }
      else{
        setIsHidden(false)
      }
    }, [location]);
  

  function handleclick(){
    localStorage.clear()
    isSignup(false)
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="title" href="/">
          <img src={logo} className="App-logo" alt="logo" /> HEALTH CARE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/" className="Sides">
              Home
            </Nav.Link>
              <Nav.Link hidden={isHidden} href="/Dashboard" className="Sides2">
                Dashboard
              </Nav.Link>
              <Nav.Link hidden={isHidden} href="/gamepage" className="Sides2">
                Activities
              </Nav.Link>
                {signup ? (
                  <div hidden={isHidden} className="d-flex gap-1">
                   {/*<img hidden={isHidden} src={propt.picture} alt="pp" height={"30px"} style={{"borderRadius": "50%"}}></img>*/} 
                    <h6 hidden={isHidden} style={{"paddingTop": "12px","color": "#1890F0", "fontFamily": "poppins", "fontWeight": "600"}}>{propt}</h6>
                    <Nav.Link hidden={isHidden} onClick={handleclick}>Logout</Nav.Link>
                  </div>
                ) : (
                  <Nav.Link hidden={isHidden} href="/Login" className="Sides2">
                  Login
                  </Nav.Link>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
