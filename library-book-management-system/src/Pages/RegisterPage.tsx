import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Image,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/regsiter.css";
import AddUser from "../GetDetails/addUser";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setError] = useState<{
    name?: string;
    designation?: string;
    email?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [data, addUser] = AddUser();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const userUrl = `${apiUrl}/userDetails`;
  const nameRegex = /^[A-za-z]+(?: [a-zA-Z]+)*$/;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phoneNumberRegex = /^[0-9]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#+=;.,/$!%*?&])[A-Za-z\d@#+=;.,/$!%*?&]{8,}$/;

  async function ValidateInput(inputValues: any) {
    let errors: {
      name: string;
      designation: string;
      email: string;
      phoneNumber: string;
      username: string;
      password: string;
      confirmPassword: string;
    } = {
      name: "",
      designation: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    if (!nameRegex.test(inputValues.name)) errors.name = "Invalid Name";
    if (inputValues.designation === "")
      errors.designation = "Invalid Designation";
    if (!emailRegex.test(inputValues.email)) errors.email = "Invalid Email";
    if (
      !(
        phoneNumberRegex.test(inputValues.phoneNumber) &&
        inputValues.phoneNumber.length === 10
      )
    )
      errors.phoneNumber = "Invalid Phone number";
    if (!nameRegex.test(inputValues.username))
      errors.username = "Invalid Username";
    if (!passwordRegex.test(inputValues.password))
      errors.password = "Invalid Password";
    if (
      !(
        passwordRegex.test(inputValues.confirmPassword) &&
        inputValues.password === inputValues.confirmPassword
      )
    )
      errors.confirmPassword = "Invalid Confirm Password";
    return errors;
  }

  /* To validate the input values entered in forms */
  function handleChange(event: any) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  /* To check validation and add user to json server */
  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const validationError = await ValidateInput(formData);
      setError(validationError);
      console.log(validationError, formData);
      const isValid = Object.values(validationError).every(
        (value) => value === "",
      );
      // If no validation errors
      if (isValid) {
        // Prepare user data
        const userData = formData;

        // Call your custom hook / function
        await addUser(userUrl, userData);

        console.log("User added:", userData);

        // Navigate to login page
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Error posting data:", error.message);
      setError({ email: "Something went wrong. Try again." });
    }
  }
  /* To log entered details */

  return (
    <Container fluid className="login-container">
      <div className="image-wrapper">
        {/* Background Image */}
        <img src="/login.jpg" alt="login" className="bg-image" />

        {/* Overlay Form */}
        <div className="overlay">
          <div className="login-card">
            <Form onSubmit={handleSubmit} className="mb-3 mt-5">
              <h3 className="text-dark mb-4 text-center">Create Account</h3>
              <div>
                {Object.keys(errors).length === 0 && submitting ? (
                  <p className="text-danger">
                    <sup>*</sup>Registered Successfully
                  </p>
                ) : null}
              </div>
              <Form.Group controlId="FormName">
                <FloatingLabel
                  controlId="floatingName"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    size="lg"
                    placeholder="Name"
                  />
                  {errors.name ? (
                    <Form.Text className="text-danger">
                      <sup>*</sup>Valid Name must be given{" "}
                    </Form.Text>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormDesignation">
                <FloatingLabel
                  controlId="floatingDesignation"
                  label="Designation"
                  className="mb-3"
                >
                  <Form.Select
                    name="designation"
                    defaultValue="selectDesignation"
                    value={formData.designation}
                    onChange={handleChange}
                  >
                    <option value="selectDesignation">
                      Select Designation
                    </option>
                    <option value="student">Student</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="workingprofessional">
                      {" "}
                      Working Professional{" "}
                    </option>
                    <option value="jobseeker">Job Seeker</option>
                  </Form.Select>
                  {errors.name ? (
                    <Form.Text className="text-danger">
                      <sup>*</sup>Please Select Designation
                    </Form.Text>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormEmail">
                <FloatingLabel
                  controlId="floatingEmail"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email ? (
                    <p className="text-danger">
                      <sup>*</sup>
                      {errors.email}
                    </p>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormPhoneNumber">
                <FloatingLabel
                  controlId="floatingPhoneNumber"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber ? (
                    <p className="text-danger">
                      <sup>*</sup>Valid Phone number must be given
                    </p>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormUserName">
                <FloatingLabel
                  controlId="floatingUserName"
                  label="UserName"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="User Name"
                  />
                  {errors.username ? (
                    <p className="text-danger">
                      <sup>*</sup>UserName must contains alphabets
                    </p>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormPassword">
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  {errors.password ? (
                    <p className="text-danger">
                      <sup>*</sup>
                      Password must contains atleast one uppercase, one
                      lowercase, one digit and one special character and atleast
                      8 characters long{" "}
                    </p>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormConfirmPassword">
                <FloatingLabel
                  controlId="floatingConfirmPassword"
                  label="ConfirmPassword"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword ? (
                    <p className="text-danger">
                      <sup>*</sup>
                      Password and Confirm Password should match
                    </p>
                  ) : null}
                </FloatingLabel>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="dark" type="submit" size="lg">
                  {" "}
                  Register
                </Button>
              </div>
            </Form>
            <p className="text-center">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
