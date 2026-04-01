import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Cart, BoxArrowRight } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import useFetchCartLength from "../GetDetails/fetchNoOfItemsInCart";
export default function NavBar() {
  const [NoOfCartItems, setCartLength] = useState(0);
  const { cartLength, fetchCartItemsLength } = useFetchCartLength();
  const navigate = useNavigate();

  useEffect(() => {
    const assignCartLength = async () => {
      await fetchCartItemsLength();
      setCartLength(cartLength);
      // console.log(NoOfCartItems);
    };
    assignCartLength();
  }, [cartLength, fetchCartItemsLength]);

  const logoutUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
    console.log("User signed out successfully");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="">
          <Navbar.Brand href="#">E-book</Navbar.Brand>
          <Nav>
            <div className="d-flex">
              <Link to="/home" className="me-4 link-light link-underline-dark ">
                Home
              </Link>
            </div>
            <div className="d-flex">
              <div>
                <Link
                  to="/cart"
                  className="me-4 link-light link-underline-dark"
                >
                  <Cart color="white" size={30} />
                  <sub className="text-white">{NoOfCartItems}</sub>
                </Link>
              </div>
              <Link
                to="/register"
                className="me-4 link-light link-underline-dark"
              >
                Profile
              </Link>
              <div className="ms-4 link-light link-underline-dark">
                <Button onClick={logoutUser} className="" variant="dark">
                  <BoxArrowRight color="white" size={35} />
                </Button>
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
