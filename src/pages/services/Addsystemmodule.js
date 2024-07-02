import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Form,
} from "reactstrap"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "react-toastify/dist/ReactToastify.css"

function Addsystemmodule() {
  const [form, setform] = useState([])
  const [Files, setFiles] = useState("")
  const [Files1, setFiles1] = useState("")

  const changeHandler = e => {
    setFiles(e.target.files)
  }

  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }
  const handleSubmit = e => {
    e.preventDefault()
    AddServices()
  }
  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const history = useHistory()
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const AddServices = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("name", form.name)

    dataArray.append("selection", form.selection)

    dataArray.append("variant", form.variant)

    dataArray.append("order", form.order)

    dataArray.append("status", form.status)

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("thumbnailimage", Files1[i])
    }
    axios
      .post("http://16.171.143.201:5025/v1/admin/service/add", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push("/Modules")
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
      name: "",
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="System module" />
          <Row>
            <Col md="12">
              <Card className="mini-stats-wid">
                <CardBody>
                  <Form
                    onSubmit={e => {
                      handleSubmit(e)
                    }}
                  >
                    <Row className="mb-2">
                      <Col>
                        <h5>Add Service</h5>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <label>Service Name (EN)</label>
                        <Input
                          name="name"
                          placeholder="Enter Service Name"
                          type="text"
                          className="form-control"
                          value={form.name}
                          onChange={e => {
                            handleChange(e)
                          }}
                        ></Input>
                      </Col>

                      <Col md={6}>
                        <label>
                          Select Order <span className="text-danger">*</span>
                        </label>

                        <select
                          onChange={e => {
                            handleChange(e)
                          }}
                          value={form.order}
                          name="order"
                          className="form-select"
                        >
                          <option value="">Select Order</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </Col>

                      <Col md={6}>
                        <div className="mt-4">
                          <label>
                            Select Variant
                            <span className="text-danger">*</span>
                          </label>

                          <select
                            onChange={e => {
                              handleChange(e)
                            }}
                            value={form.variant}
                            name="variant"
                            className="form-select"
                          >
                            <option value="">Select Variant</option>
                            <option value="a">
                              Variant A (Category ,Sub-Category, Sub-Sub
                              Category)
                            </option>
                            <option value="b">
                              Variant B (Category , Sub-Category)
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mt-4">
                          <label>
                            Service Section
                            <span className="text-danger">*</span>
                          </label>

                          <select
                            onChange={e => {
                              handleChange(e)
                            }}
                            value={form.selection}
                            name="selection"
                            className="form-select"
                          >
                            <option value=""> Service Section</option>
                            <option value="0">Single</option>
                            <option value="1">Multiple</option>
                          </select>
                        </div>
                      </Col>

                      <div className="mt-4">
                        <Row>
                          <Col md={6}>
                            <label>Icon* ( Ratio 1:1)</label>
                            <Input
                              type="file"
                              className="form-control"
                              onChange={changeHandler}
                            ></Input>
                          </Col>

                          <Col md={6}>
                            <label>Thumbnail* ( Ratio 1:1)</label>
                            <Input
                              type="file"
                              className="form-control"
                              onChange={changeHandler1}
                            ></Input>
                          </Col>

                          <Col md={6}>
                            <div className="mt-4">
                              <label>
                                Status <span className="text-danger">*</span>
                              </label>

                              <select
                                onChange={e => {
                                  handleChange(e)
                                }}
                                value={form.status}
                                name="status"
                                className="form-select"
                              >
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">In Active</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Col md={12} className="mt-4">
                        <div style={{ float: "right" }}>
                          <Button color="primary" className="btn btn-primary">
                            Submit
                          </Button>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Addsystemmodule
