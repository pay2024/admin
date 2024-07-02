import React, { useState } from "react"
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

function HomeCategory() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Top Category" />{" "}
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
                          Add Category{" "}
                        </Button>
                      </div>
                      <h5>Category List</h5>
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
                            <th>Cat Name</th>
                            <th> Cat Rank</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Grocery & Staples # ( నిత్యావసర సరుకులు )</td>
                            <td>1</td>
                            <td>
                              <Button
                                color="primary"
                                className="btn btn-primary m-1"
                                onClick={() => {
                                  tog_small1()
                                }}
                              >
                                <i className="mdi mdi-pencil-outline"></i>
                              </Button>

                              <Button
                                color="danger"
                                className="btn btn-danger "
                              >
                                <i className="mdi mdi-delete-outline"></i>
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
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
                Add Product
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
                  handleSubmit1(e)
                }}
              >
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Select Category <span className="text-danger">*</span>
                      </Label>

                      <select
                        // onChange={e => {
                        //   handleChange1(e)
                        // }}
                        // value={form1.isActive}
                        name="isActive"
                        className="form-select"
                      >
                        <option value="">Select Parent</option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Select Position <span className="text-danger">*</span>
                      </Label>

                      <select
                        // onChange={e => {
                        //   handleChange1(e)
                        // }}
                        // value={form1.isActive}
                        name="isActive"
                        className="form-select"
                      >
                        <option value="">Select Position</option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                      </select>
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
            size="md"
            isOpen={modal_small1}
            toggle={() => {
              tog_small1()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Edit Product
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
                        Select Category <span className="text-danger">*</span>
                      </Label>

                      <select
                        // onChange={e => {
                        //   handleChange1(e)
                        // }}
                        // value={form1.isActive}
                        name="isActive"
                        className="form-select"
                      >
                        <option value="">Select Parent</option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input3">
                        Select Position <span className="text-danger">*</span>
                      </Label>

                      <select
                        // onChange={e => {
                        //   handleChange1(e)
                        // }}
                        // value={form1.isActive}
                        name="isActive"
                        className="form-select"
                      >
                        <option value=""> Select Position </option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                      </select>
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
      </div>{" "}
    </React.Fragment>
  )
}

export default HomeCategory
