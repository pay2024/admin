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

function SpecificationsValues() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [Modules, setModules] = useState([])

  const [Specifications, setSpecifications] = useState([])

  const [Categories, setCategories] = useState([])

  const [Categoriess, setCategoriess] = useState([])

  const [form, setform] = useState([])

  const [form1, setform1] = useState([])

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

    const data = {
      name: form.name,
      serviceId: form.serviceId,
      categoryId: form.categoryId,
      specitifcationId: form.specitifcationId,
    }

    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/specificationsvalues/add",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
      serviceId: "",
      categoryId: "",
      specitifcationId: "",
    })
  }

  useEffect(() => {
    GetAllCategories()
    GetallModules()
    GetAllCategoriess()
    GetAllSpecifications()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const GetAllCategories = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/specificationsvalues/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setCategories(res.data.data)
      })
  }

  const GetAllSpecifications = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/specifications/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setSpecifications(res.data.data)
      })
  }

  const GetAllCategoriess = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/category/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setCategoriess(res.data.data)
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

  const EditCategory = () => {
    var token = datas

    const id = form1._id

    const data = {
      name: form1.name,
      serviceId: form1.serviceId,
      categoryId: form1.categoryId,
      specitifcationId: form1.specitifcationId,
      status: form1.status,
    }

    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/specificationsvalues/edit/" + id,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
        "http://16.171.143.201:5025/v1/admin/specificationsvalues/delete" +
          "/" +
          remid,

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
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Pay To Mart"
            breadcrumbItem="SpecificationsValues"
          />{" "}
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
                          Add SpecificationsValues{" "}
                        </Button>
                      </div>
                      <h5>SpecificationsValues List</h5>
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
                          <tr className="text-center">
                            <th>S.NO</th>
                            <th>Name</th>
                            <th>Service Name</th>
                            <th>Category Name</th>
                            <th>Service Name</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.name}</td>
                              <td>{data.serviceName}</td>
                              <td>{data.categoryName}</td>
                              <td>{data.serviceName}</td>
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

                  <ToastContainer />
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
                Add Sub Category
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
                <div className="mb-3">
                  <Label for="basicpill-firstname-input3">
                    Category Name<span className="text-danger">*</span>
                  </Label>

                  <select
                    onChange={e => {
                      handleChange(e)
                    }}
                    value={form.categoryId}
                    name="categoryId"
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {Categoriess.map((data, key) => {
                      return (
                        <option key={key} value={data._id}>
                          {data.name}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <Label for="basicpill-firstname-input3">
                    Specifications Name<span className="text-danger">*</span>
                  </Label>

                  <select
                    onChange={e => {
                      handleChange(e)
                    }}
                    value={form.specitifcationId}
                    name="specitifcationId"
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {Specifications.map((data, key) => {
                      return (
                        <option key={key} value={data._id}>
                          {data.name}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <Label for="basicpill-firstname-input1">
                    Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="basicpill-firstname-input1"
                    placeholder="Enter  Name"
                    required
                    name="name"
                    value={form.name}
                    onChange={e => {
                      handleChange(e)
                    }}
                  />
                </div>

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
                Edit SpecificationsValues
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
                <div className="mb-3">
                  <Label for="basicpill-firstname-input3">
                    Category Name<span className="text-danger">*</span>
                  </Label>

                  <select
                    onChange={e => {
                      handleChange1(e)
                    }}
                    value={form1.categoryId}
                    name="categoryId"
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {Categoriess.map((data, key) => {
                      return (
                        <option key={key} value={data._id}>
                          {data.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <Label for="basicpill-firstname-input3">
                    Specifications Name<span className="text-danger">*</span>
                  </Label>

                  <select
                    onChange={e => {
                      handleChange1(e)
                    }}
                    value={form1.specitifcationId}
                    name="specitifcationId"
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {Specifications.map((data, key) => {
                      return (
                        <option key={key} value={data._id}>
                          {data.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
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

                <div className="mt-3 mb-3">
                  <label>
                    Status <span className="text-danger">*</span>
                  </label>

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
                    <option value="inactive">In Active</option>
                  </select>
                </div>

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
      </div>{" "}
    </React.Fragment>
  )
}

export default SpecificationsValues
