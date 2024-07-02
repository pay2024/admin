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

function SubSubCategory() {
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

  const [Categoriess, setCategoriess] = useState([])

  const [subCategories, setsubCategories] = useState([])

  const [form, setform] = useState([])

  console.log(form)

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

  const [formValues, setFormValues] = useState([
    { name: "", description: "", languageId: "" },
  ])

  console.log(formValues)

  let handleChanges = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { name: "", description: "", languageId: "" },
    ])
  }

  let removeFormFields = i => {
    let newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }

  const AddCategory = () => {
    var token = datas

    const dataArray = new FormData()

    dataArray.append("name", form.name)

    dataArray.append("description", form.description)

    dataArray.append("order", form.order)

    dataArray.append("serviceId", form.serviceId)

    dataArray.append("categoryId", form.categoryId)

    // dataArray.append("languageId", form.languageId)

    dataArray.append("subcategoryId", form.subcategoryId)

    dataArray.append("langArray", JSON.stringify(formValues))

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }

    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/subsubcategory/add",
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
      description: "",
      order: "",
      serviceId: "",
      categoryId: "",
      subcategoryId: "",
      // languageId: "",
    })
  }

  useEffect(() => {
    GetAllCategories()
    GetallModules()
    GetAllCategoriess()
    GetAllCategoriesss()
    getAllLanguages()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const GetAllCategories = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/subsubcategory/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setCategories(res.data.data)
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

  const GetAllCategoriesss = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/subcategory/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setsubCategories(res.data.data)
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

  // const getpopup = data => {
  //   setform1(data)
  //   tog_small1()
  // }

  const changeHandler1 = e => {
    setFiles1(e.target.files)
  }

  const [formValues1, setFormValues1] = useState([])

  let handleChanges1 = (i, e) => {
    let newFormValues = [...formValues1]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues1(newFormValues)
  }

  let addFormFields1 = () => {
    setFormValues1([
      ...formValues1,
      { name: "", description: "", languageId: "" },
    ])
  }

  let removeFormFields1 = i => {
    let newFormValues = [...formValues1]
    newFormValues.splice(i, 1)
    setFormValues1(newFormValues)
  }

  const getpopup = data => {
    setform1(data)
    setFormValues1(data.languageSubCategory)
    tog_small1()
  }

  const EditCategory = () => {
    var token = datas

    const id = form1._id

    const dataArray = new FormData()

    dataArray.append("name", form1.name)

    dataArray.append("description", form1.description)

    dataArray.append("order", form1.order)

    dataArray.append("serviceId", form1.serviceId)

    dataArray.append("categoryId", form1.categoryId)

    dataArray.append("subcategoryId", form1.subcategoryId)

    // dataArray.append("languageId", form1.languagesId)

    dataArray.append("status", form1.status)

    dataArray.append("langArray", JSON.stringify(formValues1))

    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }

    axios
      .put(
        "http://16.171.143.201:5025/v1/admin/subsubcategory/edit/" + id,
        dataArray,
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
        "http://16.171.143.201:5025/v1/admin/subsubcategory/delete" +
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

  const [language, setlanguage] = useState([])

  const getAllLanguages = () => {
    var token = datas
    axios
      .post(
        "http://16.171.143.201:5025/v1/admin/languages/getAll",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setlanguage(res.data.data)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Sub Sub Category" />{" "}
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
                          Add Sub Sub Category{" "}
                        </Button>
                      </div>
                      <h5>Sub Sub Category List</h5>
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
                            <th>SubSubCategory Name</th>
                            <th>SubCategory Name</th>
                            <th>Category Name</th>
                            <th>Service Name</th>
                            <th>Sort Order</th>
                            <th>Cat Image</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.name}</td>
                              <td>{data.subcategoryName}</td>
                              <td>{data.categoryName}</td>
                              <td>{data.serviceName}</td>
                              <td>{data.order}</td>
                              <td>
                                <img
                                  src={
                                    "http://16.171.143.201:5025/" + data.image
                                  }
                                  height="120"
                                  width="120"
                                />
                              </td>
                              <th>{data.description}</th>
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
            size="xl"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Add Categories
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
                  <Col md={3}>
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
                  <Col md={3}>
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
                  </Col>

                  <Col md={3}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Sub Category Name<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.subcategoryId}
                        name="subcategoryId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {subCategories.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col md={3}>
                    <label>Sub Sub Category Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Sub Sub  Category Name"
                      className="form-control"
                      value={form.name}
                      onChange={e => {
                        handleChange(e)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
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
                  <Col md={3}>
                    <label>Description</label>
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      className="form-control"
                      value={form.description}
                      onChange={e => {
                        handleChange(e)
                      }}
                    />
                  </Col>{" "}
                  <Col md={3}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Select Order <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Select Order"
                        required
                        name="order"
                        value={form.order}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div style={{ marginTop: "20px" }}>
                      <Button
                        type="button"
                        className="m-1"
                        color="primary"
                        onClick={() => addFormFields()}
                      >
                        Add
                      </Button>{" "}
                    </div>{" "}
                  </Col>
                </Row>
                {formValues.map((element, index) => (
                  <div className="form-inline" key={index}>
                    <Row>
                      <Col md={3}>
                        <label> Language </label>
                        <select
                          onChange={e => handleChanges(index, e)}
                          value={element.languageId || ""}
                          name="languageId"
                          className="form-select"
                        >
                          <option value="">Select</option>
                          {language.map((data, key) => {
                            return (
                              <option key={key} value={data._id}>
                                {data.name}
                              </option>
                            )
                          })}
                        </select>
                      </Col>
                      <Col md={3}>
                        <label>Sub Category Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Sub Category Name"
                          className="form-control"
                          value={element.name || ""}
                          onChange={e => handleChanges(index, e)}
                        />
                      </Col>{" "}
                      <Col md={3}>
                        <label>Description</label>
                        <textarea
                          type="text"
                          name="description"
                          placeholder="Enter Description "
                          className="form-control"
                          value={element.description || ""}
                          onChange={e => handleChanges(index, e)}
                        />
                      </Col>
                      <Col md={3}>
                        {index ? (
                          <Button
                            type="button"
                            className="m-1 mt-4"
                            color="danger"
                            onClick={() => removeFormFields(index)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                ))}

                {/* <Row>
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
                        language<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.languageId}
                        name="languageId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {language.map((data, key) => {
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
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        SubCategory Name<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange(e)
                        }}
                        value={form.subcategoryId}
                        name="subcategoryId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {subCategories.map((data, key) => {
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
                        Sub Sub Category Name{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Sub Sub Category Name"
                        required
                        name="name"
                        value={form.name}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>{" "}
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
                    </div>{" "}
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Description <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Category Title"
                        required
                        name="description"
                        value={form.description}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Select Order <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Select Order"
                        required
                        name="order"
                        value={form.order}
                        onChange={e => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </Col>
                </Row> */}
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
            size="xl"
            isOpen={modal_small1}
            toggle={() => {
              tog_small1()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Edit Sub Sub Category
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
                {/* <Row>
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
                        language<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.languagesId}
                        name="languagesId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {language.map((data, key) => {
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
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Sub Category Name<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.subcategoryId}
                        name="subcategoryId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {subCategories.map((data, key) => {
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
                        Category Title <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Sub Sub Category Name "
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
                        Select Order <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Select Order"
                        required
                        name="order"
                        value={form1.order}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className=" mb-3">
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
                    </div>{" "}
                  </Col>{" "}
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Description <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Category Title"
                        required
                        name="description"
                        value={form1.description}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                </Row> */}

                <Row>
                  <Col md={3}>
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
                  <Col md={3}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Sub Category Name<span className="text-danger">*</span>
                      </Label>

                      <select
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.subcategoryId}
                        name="subcategoryId"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {subCategories.map((data, key) => {
                          return (
                            <option key={key} value={data._id}>
                              {data.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col md={3}>
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
                  </Col>

                  <Col md={3}>
                    <label>Sub Category Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Sub Category Name"
                      className="form-control"
                      value={form1.name}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
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
                  <Col md={3}>
                    <label>Description</label>
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      className="form-control"
                      value={form1.description}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </Col>{" "}
                  <Col md={3}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Select Order <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Select Order"
                        required
                        name="order"
                        value={form1.order}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div style={{ marginTop: "20px" }}>
                      <Button
                        type="button"
                        className="m-1"
                        color="primary"
                        onClick={() => addFormFields1()}
                      >
                        Add
                      </Button>{" "}
                    </div>{" "}
                  </Col>
                </Row>
                {formValues1.map((element, index) => (
                  <div className="form-inline" key={index}>
                    <Row>
                      <Col md={3}>
                        <label> Language </label>
                        <select
                          onChange={e => handleChanges1(index, e)}
                          value={element.languageId || ""}
                          name="languageId"
                          className="form-select"
                        >
                          <option value="">Select</option>
                          {language.map((data, key) => {
                            return (
                              <option key={key} value={data._id}>
                                {data.name}
                              </option>
                            )
                          })}
                        </select>
                      </Col>
                      <Col md={3}>
                        <label>Sub Category Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Sub Category Name"
                          className="form-control"
                          value={element.name || ""}
                          onChange={e => handleChanges1(index, e)}
                        />
                      </Col>{" "}
                      <Col md={3}>
                        <label>Description</label>
                        <textarea
                          type="text"
                          name="description"
                          placeholder="Enter Description "
                          className="form-control"
                          value={element.description || ""}
                          onChange={e => handleChanges1(index, e)}
                        />
                      </Col>
                      <Col md={3}>
                        {index ? (
                          <Button
                            type="button"
                            className="m-1 mt-4"
                            color="danger"
                            onClick={() => removeFormFields1(index)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                ))}

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

export default SubSubCategory
