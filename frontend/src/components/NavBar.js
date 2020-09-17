import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Nav,
  Accordion,
  Card,
  FormControl,
  Button,
} from "react-bootstrap";
import MyCart from "./MyCart";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="p-0"
      >
        <div className="container">
          <Navbar.Brand href="#home">FarmLion</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">contactUs</Nav.Link>
              <NavDropdown title="Location" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <div className="location">
                    <form>
                      <div className="form-group">
                        <label htmlFor="pincode">pincode</label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </form>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
              {!user && (
                <React.Fragment>
                  <Nav.Link href="/login">login</Nav.Link>
                  <span className="mt-2">|</span>
                  <Nav.Link href="/register">signup</Nav.Link>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavDropdown title={user.name} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#/">Profile</NavDropdown.Item>
                    {user.isAdmin && (
                      <NavDropdown.Item href="/addProduct">
                        AddProduct
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className="container d-flex">
        <div className="col-md-2">
          <h4>LOGO</h4>
        </div>
        <div className="col-md-6">
          <div className="input-group ">
            <input
              className="form-control"
              type="text"
              placeholder="search for products..."
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 ml-3">
          <h4>BLogo</h4>
        </div>
        <div className="col-md-2">
          <MyCart user={user} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
