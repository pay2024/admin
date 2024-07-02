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
import axios from "axios"
import ReactPaginate from "react-paginate"
import { ToastContainer, toast } from "react-toastify"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function States() {
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

  const [state, setstate] = useState([])

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

  const getAllbrand = () => {
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
        setbrand(res.data.data)
      })
  }

  const getAllState = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/state/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setstate(res.data.data)
      })
  }

  const addbrands = () => {
    var token = datas
    const dataArray = {
      name: form.name,
      stateId: form.stateId,
      status: form.status,
    }
    axios
      .post("http://16.171.143.201:5025/v1/admin/city/add", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getAllbrand()
            clearForm()
            setmodal_small(false)
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
      stateId: form1.stateId,
      name: form1.name,
      status: form1.status,
    }
    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/city/edit" + "/" + docid,
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
    })
  }

  const getpopup = ds => {
    setform1(ds)
    tog_small1()
  }

  useEffect(() => {
    getAllbrand()
    getAllState()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = brand.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(brand.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const manageDelete = ds => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      deletefeature(ds)
    }
  }

  const deletefeature = ds => {
    var token = datas
    var remid = ds._id
    axios
      .delete(
        "http://16.171.143.201:5025/v1/admin/city/delete" + "/" + remid,

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
        `http://103.186.185.77:5021/api/v1/admin/cartype/getallcartypes?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setbrand(res.data.typeResult)
      })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="City List" />{" "}
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
                          Add City{" "}
                        </Button>
                      </div>
                      <h5>City List</h5>
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
                            <th>City</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((ds, key) => (
                            <tr key={key}>
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{ds.name}</td>
                              <td>{ds.logCreatedDate.slice(0, 10)}</td>
                              <td>{ds.status}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    getpopup(ds)
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
                                    manageDelete(ds)
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
            size="md"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Add City
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
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        State Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.stateId}
                        name="stateId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {state.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        City Name<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter City Name"
                        required
                        value={form.name}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
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
                        <option value="Inactive">In Active</option>
                      </select>
                    </div>{" "}
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
            size="md"
            isOpen={modal_small1}
            toggle={() => {
              tog_small1()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Edit City
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
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        State Name <span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.stateId}
                        name="stateId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {state.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        City Name<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter City Name"
                        required
                        value={form1.name}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={12}>
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
                        <option value="Inactive">In Active</option>
                      </select>
                    </div>{" "}
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
          <ToastContainer />
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default States
