import React, { useEffect, useState } from "react"
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
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"

function Coupons() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [brand, setbrand] = useState([])
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token
  console.log(datas)

  const getAllbrand = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/coupons/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setbrand(res.data.data)
      })
  }

  const addbrands = () => {
    var token = datas
    const dataArray = {
      name: form.name,
      serviceId: form.serviceId,
      code: form.code,
      description: form.description,
      start_date: form.start_date,
      end_date: form.end_date,
      minimum_cart: form.minimum_cart,
      maximum_per_user: form.maximum_per_user,
      limit: form.limit,
    }
    axios
      .post("http://16.171.143.201:5025/v1/admin/coupons/add", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getAllbrand()
            setmodal_small(false)
            clearForm()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const editbrands = () => {
    var token = datas
    const docid = form1._id
    const dataArray = {
      name: form1.name,
      serviceId: form1.serviceId,
      code: form1.code,
      description: form1.description,
      start_date: form1.start_date,
      end_date: form1.end_date,
      minimum_cart: form1.minimum_cart,
      maximum_per_user: form1.maximum_per_user,
      limit: form1.limit,
    }
    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/coupons/edit" + "/" + docid,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getAllbrand()
            setmodal_small1(false)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleSubmit = e => {
    e.preventDefault()
    addbrands()
  }
  const handleSubmit1 = e => {
    e.preventDefault()
    editbrands()
  }

  const clearForm = () => {
    setform({
      name: "",
      serviceId: "",
      code: "",
      description: "",
      start_date: "",
      end_date: "",
      minimum_cart: "",
      maximum_per_user: "",
      limit: "",
    })
  }

  const getpopup = data => {
    setform1(data)
    tog_small1()
  }

  useEffect(() => {
    getAllbrand()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = brand.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(brand.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Inactive?")
    if (confirmBox === true) {
      deletefeature(data)
    }
  }

  const deletefeature = data => {
    var token = datas
    var remid = data._id
    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/coupons/delete" + "/" + remid,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getAllbrand()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const [search, setsearch] = useState([])

  const searchAll = e => {
    let myUser = { ...search }
    myUser[e.target.name] = e.target.value
    setsearch(myUser)

    var token = datas
    axios
      .post(
        `http://16.171.143.201:5025/v1/admin/coupons/getAll?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setbrand(res.data.data)
      })
  }

  const [Modules, setModules] = useState([])

  useEffect(() => {
    GetallModules()
  }, [])

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Coupon List" />{" "}
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
                          Add Coupon{" "}
                        </Button>
                      </div>
                      <h5>Coupon List</h5>
                    </Col>
                  </Row>
                  <Row className="mt-1 mb-3">
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          type="search"
                          className="form-control"
                          placeholder="Search.."
                          value={search.search}
                          onChange={searchAll}
                          name="search"
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
                            <th>Coupon Name</th>
                            <th>Coupon Code</th>
                            <th>Service Name </th>
                            <th>Coupon Limit</th>
                            <th>Start Date </th>
                            <th>End Date</th>
                            <th>Minimum Cart Value</th>
                            <th>Minimum Cart Value</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.name}</td>
                              <td>{data.serviceId}</td>
                              <td>{data.code}</td>
                              <td>{data.description}</td>
                              <td>{data.start_date}</td>
                              <td>{data.end_date}</td>
                              <td>{data.minimum_cart}</td>
                              <td>{data.maximum_per_user}</td>
                              <td>{data.limit}</td>
                              <td>{data.status}</td>
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
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="danger"
                                  outline
                                  onClick={() => {
                                    manageDelete(data)
                                  }}
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
                Add Coupon
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
                        Coupon Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Coupon Name"
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
                      <Label for="basicpill-firstname-input1">
                        Coupon Code <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter  Coupon Code"
                        required
                        name="code"
                        value={form.code}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Coupon Limit<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Coupon Limit"
                        required
                        name="limit"
                        value={form.limit}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Start Date<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Store Number"
                        required
                        name="start_date"
                        value={form.start_date}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        End Date<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Admin Share(%)"
                        required
                        name="end_date"
                        value={form.end_date}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Minimum Cart Value<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Minimum Cart Value"
                        required
                        name="minimum_cart"
                        value={form.minimum_cart}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Minimum Cart Value<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Minimum Cart Value"
                        required
                        name="maximum_per_user"
                        value={form.maximum_per_user}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Description<span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Description"
                        required
                        name="description"
                        value={form.description}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                </Row>
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
                Edit Coupon
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
                        Coupon Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Coupon Name"
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
                      <Label for="basicpill-firstname-input1">
                        Coupon Code <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter  Coupon Code"
                        required
                        name="code"
                        value={form1.code}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Coupon Limit<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Coupon Limit"
                        required
                        name="limit"
                        value={form1.limit}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Start Date<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Store Number"
                        required
                        name="start_date"
                        value={form1.start_date}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        End Date<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Admin Share(%)"
                        required
                        name="end_date"
                        value={form1.end_date}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Minimum Cart Value<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Minimum Cart Value"
                        required
                        name="minimum_cart"
                        value={form1.minimum_cart}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <Label for="basicpill-firstname-input1">
                        Minimum Cart Value<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Minimum Cart Value"
                        required
                        name="maximum_per_user"
                        value={form1.maximum_per_user}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Description<span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Description"
                        required
                        name="description"
                        value={form1.description}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <div style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      setmodal_small1(false)
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
              </Form>
            </div>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default Coupons
