import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Label,
} from "reactstrap"
import classnames from "classnames"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getProductDetail as onGetProductDetail,
  getProductComments,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const EcommerceProductDetail = props => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { product, productComments } = useSelector(state => ({
    product: state.ecommerce.product,
    productComments: state.ecommerce.productComments,
  }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetProductDetail(params.id))
    } else {
      dispatch(onGetProductDetail(1))
    }
  }, [dispatch, params])

  useEffect(() => {
    dispatch(getProductComments())
  }, [dispatch])

  const [comments, setComments] = useState([])
  useEffect(() => {
    if (productComments) {
      setComments(productComments)
    }
  }, [productComments])

  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [form, setform] = useState([])
  const [Files, setFiles] = useState("")

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

    dataArray.append("status", form.status)

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }

    axios
      .post("http://16.171.143.201:5025/v1/admin/subbanners/add", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product Detail" />

          <Row>
            <Col>
              <Button
                onClick={() => history.goBack()}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="primary"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="4">
                      <div className="product-detai-imgs">
                        <Row>
                          <Col md={{ size: 7, offset: 1 }} xs="9">
                            <div>
                              <h5>Product Detail :-</h5>
                              <img
                                src="https://5.imimg.com/data5/UB/WG/JK/SELLER-98634555/brown-plain-industrial-jute-sack-bag-500x500.jpg"
                                alt=""
                                id="expandedImg1"
                                className="img-fluid mx-auto d-block mt-5"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col xl="8">
                      <div className="mt-4 mt-xl-3">
                        <h4 className="mt-1 mb-3"> Rice</h4>

                        <h5 className="mb-4">
                          Service : <span className="text-muted me-2"></span>{" "}
                          <b>Pay To Mart </b>
                        </h5>
                        <p className="text-muted mb-4">
                          Are you a health freak? If yes, this Sona Masoori Raw
                          Rice from BB Royal is a sorted and perfect option for
                          you. With a lower percentage of cholesterol and fats,
                          this one is a healthy choice with an abundance of
                          nutrients intact, especially fiber. This is an organic
                          product from the superior shelf of Bb Royal and will
                          satisfy your rice cravings very swiftly. Not only
                          this, but it will also provide you with an abundance
                          of top-quality taste and nutrients. Go for this
                          Organic Kurnool Sona masoori Raw Rice and elevate your
                          diet plan in the right direction with all the goodness
                          of this rice.
                        </p>
                        <Row className="mb-3">
                          <Col md="6">
                            {product.features &&
                              product.features.map((item, i) => (
                                <div key={i}>
                                  <p className="text-muted">
                                    <i
                                      className={classnames(
                                        item.icon,
                                        "font-size-16 align-middle text-primary me-2"
                                      )}
                                    />
                                    Pay To Mart
                                  </p>
                                </div>
                              ))}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className="mb-5">
                <CardBody>
                  <div className="mt-2">
                    <Row>
                      <Col>
                        <h5>Specifications :</h5>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => {
                            tog_small()
                          }}
                          style={{ float: "right" }}
                          color="primary"
                        >
                          Add Product
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <div className="table-responsive">
                          <Table className="table mb-0 table-bordered">
                            <thead className="text-center">
                              <tr>
                                <th>Specifications Name</th>
                                <th>Specifications Value</th>
                                <th>Specifications Image</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-center">
                                <td>test</td>
                                <td>test2</td>
                                <td>test3</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>{" "}
                      </Col>
                    </Row>
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
                Add Specifications
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
                  <Label for="basicpill-firstname-input1">
                    Specification Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="basicpill-firstname-input1"
                    placeholder="Enter Specification Name"
                    required
                    name="name"
                    value={form.name}
                    onChange={e => {
                      handleChange(e)
                    }}
                  />
                </div>

                <div className="mb-3">
                  <Label for="basicpill-firstname-input1">
                    Specification Value <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="basicpill-firstname-input1"
                    placeholder="Enter Specification Value"
                    required
                    name="name"
                    value={form.name}
                    onChange={e => {
                      handleChange(e)
                    }}
                  />
                </div>

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
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceProductDetail.propTypes = {
  product: PropTypes.object,
  match: PropTypes.any,
  onGetProductDetail: PropTypes.func,
}

export default EcommerceProductDetail
