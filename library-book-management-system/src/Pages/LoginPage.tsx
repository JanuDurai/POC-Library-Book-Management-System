import { useState } from "react";
import {
    Button,
    Container,
    FloatingLabel,
    Form
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/login.css";
import useFetch from "../GetDetails/FetchUser";

function LoginPage() {
  const userDetails = useFetch() || [];
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ invalid?: string }>({});

  /* To find the user and store userId in localStorage */
  async function GetUserDetails(event: any) {
    event.preventDefault();
    try {
      const errors: { invalid?: string } = {};
      const user:any = userDetails.find(
        (u: { email: string; password: string }) =>
          u.email === loginDetails.email &&
          u.password === loginDetails.password,
      );

      if (user) {
        navigate("/home");
        localStorage.setItem("userId", user.uid);
      } else {
        errors.invalid = "Invalid email or password";
        setError(errors);
      }
    } catch (err) {
      console.log("Error in sign in", err);
    }
  }

  /* To set the user entered input to the state variable */
  function handleLoginInput(event: any) {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Container fluid className="login-container">
      <div className="image-wrapper">
        {/* Background Image */}
        <img src="/login.jpg" alt="login" className="bg-image" />

        {/* Overlay Form */}
        <div className="overlay">
          <div className="login-card">
            <Form onSubmit={GetUserDetails}>
              <h3 className="text-center mb-4">Login</h3>

              {error.invalid && (
                <p className="text-danger text-center">{error.invalid}</p>
              )}

              <Form.Group className="m-3" controlId="Email">
                <FloatingLabel label="Email" controlId="Email">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={loginDetails.email}
                    onChange={handleLoginInput}
                    name="email"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="m-3">
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginDetails.password}
                    onChange={handleLoginInput}
                    name="password"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>

              <Button className="login-btn w-100" type="submit">
                Login
              </Button>
              <p className="text-center">
                Create account? <NavLink to="/register">Register</NavLink>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
