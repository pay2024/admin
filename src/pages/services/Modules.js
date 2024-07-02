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
  Form,
  Modal,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ReactPaginate from "react-paginate"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import loder from "./../../assets/images/loder.gif"

function Modules() {
  const [Modules, setModules] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [modal_small, setmodal_small] = useState(false)

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
    EditServices()
  }
  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const getpopup = data => {
    setform(data)
    tog_small()
  }

  useEffect(() => {
    GetallModules()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

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
        setIsLoading(false)
      })
  }

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = Modules.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Modules.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const EditServices = () => {
    var token = datas

    const id = form._id

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
      .post(
        "http://16.171.143.201:5025/v1/admin/service/edit/" + id,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            GetallModules()
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
        "http://16.171.143.201:5025/v1/admin/service/delete" + "/" + remid,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            GetallModules()
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
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Services List" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                {isLoading == true ? (
                  <>
                    <div
                      style={{ zIndex: "9999999999999", height: "420px" }}
                      className="text-center mt-5 pt-5"
                    >
                      <img src={loder} height="140px"></img>
                      <div>Loading......</div>
                    </div>
                  </>
                ) : (
                  <>
                    <CardBody>
                      <Row className="mb-2">
                        <Col>
                          <h5>Services List</h5>
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
                                <th>Service NAME</th>
                                <th>Order</th>
                                <th>Variant</th>
                                <th>Service Section</th>
                                <th>Image</th>
                                <th>Thumbnail Image</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lists.map((data, key) => (
                                <tr key={key} className="text-center">
                                  <th>{(pageNumber - 1) * 5 + key + 6}</th>
                                  <td>{data.name}</td>
                                  <td>{data.order}</td>
                                  <td>
                                    {data.variant == "a" ? (
                                      <>
                                        Variant A (Category ,Sub-Category,
                                        Sub-Sub Category)
                                      </>
                                    ) : (
                                      <>Variant B (Category , Sub-Category)</>
                                    )}
                                  </td>

                                  <td>
                                    {data.selection == "0" ? (
                                      <>Single</>
                                    ) : (
                                      <>Multiple</>
                                    )}
                                  </td>
                                  <td>
                                    <img
                                      src={
                                        "http://16.171.143.201:5025/" +
                                        data.image
                                      }
                                      height="120"
                                      width="120"
                                    />
                                  </td>
                                  <td>
                                    <img
                                      src={
                                        "http://16.171.143.201:5025/" +
                                        data.thumbnailimage
                                      }
                                      height="120"
                                      width="120"
                                    />
                                  </td>

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
                  </>
                )}
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
                Edit Service
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
                    <div className="mt-4">
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
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mt-4">
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
                    </div>
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
                          {" "}
                          Variant A (Category ,Sub-Category, Sub-Sub Category)
                        </option>
                        <option value="b">
                          {" "}
                          Variant B (Category , Sub-Category)
                        </option>
                      </select>{" "}
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

                  <Col md={6}>
                    <div className="mt-4">
                      <label>Icon* ( Ratio 1:1)</label>
                      <Input
                        type="file"
                        className="form-control"
                        onChange={changeHandler}
                      ></Input>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mt-4">
                      <label>Thumbnail* ( Ratio 1:1)</label>
                      <Input
                        type="file"
                        className="form-control"
                        onChange={changeHandler1}
                      ></Input>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mt-3">
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
                      </select>{" "}
                    </div>
                  </Col>

                  <Col md={12}>
                    <div style={{ float: "right" }} md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal>
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default Modules
