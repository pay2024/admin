import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  FormGroup,
} from "reactstrap"
import classnames from "classnames"
import { ToastContainer, toast } from "react-toastify"
import pback from "../../assets/images/pback.jpg"
import { withRouter } from "react-router-dom"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Link } from "react-router-dom"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [Files1, setFiles1] = useState("")

  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }
  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  useEffect(() => {
    adprofile()
  }, [])

  const [activeTab1, setactiveTab1] = useState("5")
  const toggle1 = tab => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab)
    }
  }

  const [admininfo, setadmininfo] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token
  var datas1 = data.user

  const adprofile = () => {
    var token = datas
    const adinfo = datas1.id

    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/adminemployees/getemployeebyid",
        { id: adinfo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setadmininfo(res.data.profilesResult)
        setform1(res.data.profilesResult)
      })
  }

  const editprofiles = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("firstName", form1.firstName)
    dataArray.append("lastName", form1.lastName)
    dataArray.append("email", form1.email)
    dataArray.append("phone", form1.phone)
    dataArray.append("address", form1.address)
    dataArray.append("state", "644ff143662d03a86a1c3597")
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/adminemployees/editProfile/",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            adprofile()
          }
        },
        error => {
          if (error.response && error.response.status === 404) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const changepsw = () => {
    var token = datas
    const data = {
      "password": form.password,
      "newpassword": form.newpassword,
      "confirmpassword": form.confirmpassword,
    }

    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/adminemployees/changepassword/",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            adprofile()
            setform("")
            clearForm()
          }
        },
        error => {
          if (error.response && error.response.status === 404) {
            toast(error.response.data.message)
          }
        }
      )
  }
  const clearForm = () => {
    setform({
      password: "",
      newpassword: "",
      confirmpassword: "",
    })
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    editprofiles()
  }
  const handleSubmit = e => {
    e.preventDefault()
    changepsw()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Pay 2 Mart" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="">
                    <Row>
                      <Col md={12}>
                        <div className="text-primary">
                          <h5 className="text-primary"></h5>
                          <p></p>
                        </div>

                        <img
                          style={{ height: "150px", width: "100%" }}
                          src={pback}
                          alt=""
                          className="img-fluid"
                        />
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md={2}>
                        <Link to="#" className="auth-logo-light">
                          <div className="avatar-md1 profile-user-wid mb-4">
                            <span className="ml-5">
                              <img
                                src={
                                  "http://16.171.143.201:5025/" +
                                  admininfo.profilePic
                                }
                                alt=""
                                className="avatar-md1 rounded-circle img-thumbnail"
                                height="120" width="120"
                              />
                            </span>
                          </div>
                        </Link>
                      </Col>
                      <Col md={4}>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col col-sm-3">
                              <label>Name</label>
                              <br />
                              <label>Email </label>
                            </div>
                            <div className="col">
                              <label>
                                : {admininfo.firstName} {admininfo.lastName}
                              </label>
                              <br />
                              <label>: {admininfo.email}</label>
                              <br />
                            </div>
                          </div>
                          <p></p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mt-3">
                          <Nav pills className="navtab-bg nav-justified">
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "5",
                                })}
                                onClick={() => {
                                  toggle1("5")
                                }}
                              >
                                My Profile
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "6",
                                })}
                                onClick={() => {
                                  toggle1("6")
                                }}
                              >
                                Edit Profile
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "7",
                                })}
                                onClick={() => {
                                  toggle1("7")
                                }}
                              >
                                Change Password
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>

                <div className="mb-5">
                  <TabContent activeTab={activeTab1} className="p-3 text-muted">
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            <h5> About</h5>
                            <p>
                              <b>Welcome</b>
                            </p>
                            A personal profile is something that gives whoever
                            wants to hire you or needs your services the first
                            impression
                            <br /> that you are the best candidate for this
                            website.These sites take things to the next level.
                            <Row className="mt-4">
                              <Col md={8}>
                                <Row>
                                  <Col md={4}>
                                    <p>
                                      <b>Full Name</b>
                                    </p>
                                    <p>
                                      <b>Email</b>
                                    </p>
                                    <p>
                                      <b>Phone</b>
                                    </p>
                                    <p>
                                      <b>Role</b>
                                    </p>
                                    <p>
                                      <b>Address</b>
                                    </p>
                                  </Col>
                                  <Col md={8}>
                                    <p>
                                      <b>:</b>
                                      <span>
                                        {admininfo.firstName}{" "}
                                        {admininfo.lastName}
                                      </span>
                                    </p>
                                    <p>
                                      <b>:</b>
                                      <span> {admininfo.email}</span>
                                    </p>
                                    <p>
                                      <b>:</b>
                                      <span> {admininfo.phone}</span>
                                    </p>
                                    <p>
                                      <b>:</b>
                                      <span> {admininfo.role}</span>
                                    </p>
                                    <p>
                                      <b>:</b>
                                      <span> {admininfo.address}</span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col md={6}></Col>
                            </Row>
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <form
                        onSubmit={e => {
                          handleSubmit1(e)
                        }}
                      >
                        <h5>Edit Profile</h5>
                        <Row>
                          <Col md={3}>
                            <Label>
                              First Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="firstName"
                              placeholder="Enter First Name"
                              type="text"
                              className="form-control"
                              required
                              value={form1.firstName}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                          <Col md={3}>
                            <Label>
                              Last Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="lastName"
                              placeholder="Enter Last Name"
                              type="text"
                              className="form-control"
                              required
                              value={form1.lastName}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                          <Col md={3}>
                            <Label>
                              Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="email"
                              placeholder="Enter Email"
                              type="email"
                              className="form-control"
                              value={form1.email}
                              onChange={e => {
                                handleChange1(e)
                              }}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Label>
                              Phone No. <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="phone"
                              placeholder="Enter Number"
                              type="number"
                              className="form-control"
                              value={form1.phone}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                        </Row>
                        <Row
                          className="mt-5
                         mb-3"
                        >
                          <Col md={3}>
                            <Label>
                              Profile <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="profilePic"
                              type="file"
                              className="form-control"
                              onChange={changeHandler1}
                            />
                          </Col>
                          <Col md={6}>
                            <Label>
                              Address <span className="text-danger">*</span>
                            </Label>
                            <textarea
                              name="address"
                              placeholder="Enter Address"
                              type="text"
                              className="form-control"
                              value={form1.address}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                        </Row>

                        <div style={{ float: "right" }}>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>
                    <TabPane tabId="7">
                      <form
                        onSubmit={e => {
                          handleSubmit(e)
                        }}
                      >
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <h5>Change Password</h5>

                              <Row className="mt-3">
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label>
                                      Current Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      name="password"
                                      placeholder="Current Password"
                                      type="password"
                                      className="form-control"
                                      required
                                      value={form.password}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label>
                                      New Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      name="newpassword"
                                      placeholder="New Password"
                                      type="password"
                                      required
                                      className="form-control"
                                      value={form.newpassword}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label>
                                      Confirm Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      name="confirmpassword"
                                      placeholder="Confirm Password"
                                      type="password"
                                      required
                                      className="form-control"
                                      value={form.confirmpassword}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </CardText>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>

                    <TabPane tabId="8">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            Trust fund seitan letterpress, keytar raw denim
                            keffiyeh etsy art party before they sold out master
                            cleanse gluten-free squid scenester freegan cosby
                            sweater. Fanny pack portland seitan DIY, art party
                            locavore wolf cliche high life echo park Austin.
                            Cred vinyl keffiyeh DIY salvia PBR, banh mi before
                            they sold out farm-to-table VHS viral locavore cosby
                            sweater. Lomo wolf viral, mustache readymade
                            thundercats keffiyeh craft beer marfa ethical. Wolf
                            salvia freegan, sartorial keffiyeh echo park vegan.
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
