import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Label,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ReactPaginate from "react-paginate"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"

function Store() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [Modules, setModules] = useState([])

  const [Categories, setCategories] = useState([])

  const [form, setform] = useState([])

  const [form1, setform1] = useState([])

  const [Files, setFiles] = useState("")

  const [Files1, setFiles1] = useState("")

  const changeHandler = e => {
    setFiles(e.target.files)
  }

  const handleSubmit = e => {
    e.preventDefault()
    AddCategory()
  }
  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  const AddCategory = () => {
    var token = datas

    const dataArray = new FormData()

    dataArray.append("name", form.name)

    dataArray.append("store_number", form.store_number)

    dataArray.append("employee_name", form.employee_name)

    dataArray.append("admin_share", form.admin_share)

    dataArray.append("email", form.email)

    dataArray.append("mobile", form.mobile)

    dataArray.append("address", form.address)

    dataArray.append("serviceId", form.serviceId)

    dataArray.append("gst", form.gst)

    dataArray.append("cityId", form.cityId)

    dataArray.append("password", form.password)

    dataArray.append("delievery_range", form.delievery_range)

    dataArray.append("status", form.status)

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }

    axios
      .post("http://16.171.143.201:5025/v1/admin/stores/add", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            GetAllCategories()
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
      status: "",
      order: "",
      serviceId: "",
    })
  }

  useEffect(() => {
    GetAllCategories()
    GetallModules()
    getAllCity()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const GetAllCategories = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/stores/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setCategories(res.data.data)
      })
  }

  const GetallModules = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/service/getAll/",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setModules(res.data.serviceResult)
      })
  }

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = Categories.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Categories.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditCategory()
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  const getpopup = data => {
    setform1(data)
    tog_small1()
  }

  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }

  const EditCategory = () => {
    var token = datas

    const id = form1._id

    const dataArray = new FormData()

    dataArray.append("name", form1.name)

    dataArray.append("store_number", form1.store_number)

    dataArray.append("employee_name", form1.employee_name)

    dataArray.append("admin_share", form1.admin_share)

    dataArray.append("password", form1.password)

    dataArray.append("email", form1.email)

    dataArray.append("mobile", form1.mobile)

    dataArray.append("address", form1.address)

    dataArray.append("serviceId", form1.serviceId)

    dataArray.append("gst", form1.gst)

    dataArray.append("cityId", form1.cityId)

    dataArray.append("delievery_range", form1.delievery_range)

    dataArray.append("status", form1.status)

    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }

    axios
      .put("http://16.171.143.201:5025/v1/admin/stores/edit/" + id, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small1(false)
            GetAllCategories()
          }
        },
        error => {
          if (error.response && error.response.status === 404) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const deletes = data => {
    var token = datas
    var remid = data._id
    axios
      .delete(
        "http://16.171.143.201:5025/v1/admin/stores/delete" + "/" + remid,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            GetAllCategories()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Inactive?")
    if (confirmBox === true) {
      deletes(data)
    }
  }

  const [City, setcity] = useState([])

  const getAllCity = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/city/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setcity(res.data.data)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Store " />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <div style={{ float: "right" }}>
                        <Button
                          color="primary"
                          className="btn btn-primary mb-1"
                          onClick={() => {
                            tog_small()
                          }}
                        >
                          Add Store{" "}
                        </Button>
                      </div>
                      <h5>Store List</h5>
                    </Col>
                  </Row>
                  <Row className="mt-1 mb-3">
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          className="form-control"
                          placeholder="search...."
                          type="search"
                          style={{ width: "250px" }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0">
                      <Table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>S.NO</th>
                            <th>Store Image</th>
                            <th>Store Name</th>
                            <th>Service Name</th>
                            <th>Store Number</th>
                            <th>Employee Share</th>
                            <th>Admin Share</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gst</th>
                            <th>City</th>
                            <th>Delivery Range</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>
                                <img
                                  src={
                                    "http://16.171.143.201:5025/" + data.image
                                  }
                                  height="120"
                                  width="120"
                                />
                              </td>
                              <td>{data.name}</td>
                              <td>{data.serviceName}</td>
                              <th>{data.store_number}</th>
                              <td>{data.employee_name}</td>
                              <td>{data.admin_share}</td>
                              <th>{data.email}</th>
                              <td>{data.mobile}</td>
                              <td>{data.gst}</td>
                              <th>{data.cityName}</th>
                              <td>{data.delievery_range}</td>
                              <td>{data.address}</td>
                              <th>{data.status}</th>
                              <td>
                                <Button
                                  onClick={() => {
                                    getpopup(data)
                                  }}
                                  className="mr-2"
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="success"
                                  outline
                                >
                                  <i className="bx bx-edit "></i>
                                </Button>

                                <Button
                                  onClick={() => {
                                    manageDelete(data)
                                  }}
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="danger"
                                  outline
                                >
                                  <i className="bx bx-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="mt-3" style={{ float: "right" }}>
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"pagination"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                          total={lists.length}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            size="lg"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Add Banner
              </h5>
              <button
                onClick={() => {
                  setmodal_small(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={e => {
                  handleSubmit(e)
                }}
              >
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Name"
                        required
                        name="name"
                        value={form.name}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Service Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.serviceId}
                        name="serviceId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {Modules.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        City Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.cityId}
                        name="cityId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {City.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Images <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="file"
                        className="form-control"
                        onChange={changeHandler}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Store Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Store Number"
                        required
                        name="store_number"
                        value={form.store_number}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Employee Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Employee"
                        required
                        name="employee_name"
                        value={form.employee_name}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Admin Share <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Admin Share"
                        required
                        name="admin_share"
                        value={form.admin_share}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Email <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Email"
                        required
                        name="email"
                        value={form.email}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Password"
                        required
                        name="password"
                        value={form.password}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Mobile <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Mobile"
                        required
                        name="mobile"
                        value={form.mobile}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Gst Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Gst"
                        required
                        name="gst"
                        value={form.gst}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Delievery <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Delievery"
                        required
                        name="delievery_range"
                        value={form.delievery_range}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Status <span className="text-danger">*</span>
                      </Label>

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
                        <option value="InActive">In Active</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Address <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        rows="3"
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Address"
                        required
                        name="address"
                        value={form.address}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div style={{ float: "right" }}>
                      <Button
                        onClick={() => {
                          setmodal_small(false)
                        }}
                        color="danger"
                        type="button"
                      >
                        Cancel <i className="fas fa-times-circle"></i>
                      </Button>
                      <Button className="m-1" color="primary" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal>
          <Modal
            size="lg"
            isOpen={modal_small1}
            toggle={() => {
              tog_small1()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Edit Store
              </h5>
              <button
                onClick={() => {
                  setmodal_small1(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={e => {
                  handleSubmit1(e)
                }}
              >
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Name"
                        required
                        name="name"
                        value={form1.name}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Service Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.serviceId}
                        name="serviceId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {Modules.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        City Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.cityId}
                        name="cityId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {City.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Images <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="file"
                        className="form-control"
                        onChange={changeHandler1}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Store Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Store Number"
                        required
                        name="store_number"
                        value={form1.store_number}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Employee Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Employee"
                        required
                        name="employee_name"
                        value={form1.employee_name}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Admin Share <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Admin Share"
                        required
                        name="admin_share"
                        value={form1.admin_share}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Email <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Email"
                        required
                        name="email"
                        value={form1.email}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Mobile <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Mobile"
                        required
                        name="mobile"
                        value={form1.mobile}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Gst Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Gst"
                        required
                        name="gst"
                        value={form1.gst}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Delievery <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Delievery"
                        required
                        name="delievery_range"
                        value={form1.delievery_range}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Status <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.status}
                        name="status"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="active">Active</option>
                        <option value="InActive">In Active</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Address <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        rows="3"
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Address"
                        required
                        name="address"
                        value={form1.address}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div style={{ float: "right" }}>
                      <Button
                        onClick={() => {
                          setmodal_small(false)
                        }}
                        color="danger"
                        type="button"
                      >
                        Cancel <i className="fas fa-times-circle"></i>
                      </Button>
                      <Button className="m-1" color="primary" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal>
        </Container>
        <ToastContainer />
      </div>{" "}
    </React.Fragment>
  )
}

export default Store
