import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/regsiter.css";
import AddUser from "../GetDetails/addUser";
import { ToastContainer, toast } from "react-toastify";
import UpdateUserOrProduct from "../GetDetails/updateQuantity";

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
  const [userDetails, addUser] = AddUser();
  const [mode, setMode] = useState("register");
  const [submitting, setSubmitting] = useState(false);
  const { data, updateData } = UpdateUserOrProduct();

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const userUrl = `${apiUrl}/userDetails`;
  const nameRegex = /^[A-za-z]+(?: [a-zA-Z]+)*$/;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phoneNumberRegex = /^[0-9]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#+=;.,/$!%*?&])[A-Za-z\d@#+=;.,/$!%*?&]{8,}$/;

  useEffect(() => {
    const userDetails =
      JSON.parse(
        localStorage.getItem("user") && (localStorage.getItem("user") as any),
      ) || null;
    console.log(userDetails);

    if (userDetails && userDetails !== JSON.parse("{}")) {
      setFormData(userDetails);
      setMode("view");
    } else {
      setMode("register");
    }
  }, []);

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

  function handleChange(event: any) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (mode === "register") {
      try {
        const validationError = await ValidateInput(formData);
        setError(validationError);
        console.log(validationError, formData);
        const isValid = Object.values(validationError).every(
          (value) => value === "",
        );

        if (isValid) {
          const userData = formData;

          await addUser(userUrl, userData);
          console.log("User added:", userData);
          toast.success("User Registered Successfully");
          navigate("/login");
        }
      } catch (error: any) {
        console.error("Error posting data:", error.message);
        setError({ email: "Something went wrong. Try again." });
        toast.error(error.message);
      }
    } else {
      const userId = localStorage.getItem("userId");
      const userDetailsUrl = `${userUrl}/${userId}`;
      console.log(userId, userDetailsUrl);
      await updateData(userDetailsUrl, JSON.stringify(formData));
      setMode("view");
      toast.success("User Details Updated Successfully");
    }
  }

  const handleEdit = () => {
    setMode("edit");
  };

  return (
    <Container fluid className="login-container">
      <ToastContainer></ToastContainer>
      <div className="image-wrapper">
        <img src="/login.jpg" alt="login" className="bg-image" />
        <div className="overlay">
          {mode === "view" && (
            <Button
              className="edit-btn border border-white border-2"
              variant="dark"
              size="lg"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          <div className="form-wrapper">
            <div className="login-card">
              <Form onSubmit={handleSubmit} className="mb-3 mt-5">
                <h3 className="text-dark mb-4 text-center">
                  {mode === "register"
                    ? "Create Account"
                    : mode === "edit"
                      ? "Edit Profile"
                      : "Profile"}
                </h3>
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
                      disabled={mode === "view"}
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
                      disabled={mode === "view"}
                    >
                      <option value="selectDesignation">
                        Select Designation
                      </option>
                      <option value="student">Student</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="workingprofessional">
                        Working Professional
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
                      disabled={mode === "view"}
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
                      disabled={mode === "view"}
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
                      disabled={mode === "view"}
                    />
                    {errors.username ? (
                      <p className="text-danger">
                        <sup>*</sup>UserName must contains alphabets
                      </p>
                    ) : null}
                  </FloatingLabel>
                </Form.Group>
                {mode == "register" && (
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
                          lowercase, one digit and one special character and
                          atleast 8 characters long{" "}
                        </p>
                      ) : null}
                    </FloatingLabel>
                  </Form.Group>
                )}
                {mode == "register" && (
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
                )}
                {mode !== "view" && (
                  <div className="d-grid gap-2">
                    <Button variant="dark" type="submit" size="lg">
                      {mode === "register" ? "Register" : "Update"}
                    </Button>
                  </div>
                )}
              </Form>
              {mode === "register" && (
                <p className="text-center">
                  Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
