import React from "react"
import { Container, Row, Col, Card, CardBody, Table, Input, Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function Watingforapproval() {
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
                            <th>Store Name</th>
                            <th> City</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Admin Share</th>
                            <th>Owner name</th>
                            <th>document</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              Sri Kaleswari vegetable market, Guntur- 522006
                            </td>
                            <td>Pay2Mart - Chirala (8019636360)</td>
                            <td>9999999999</td>
                            <td> test@gmail.com</td>
                            <td> 180825</td>
                            <td>Kaleswari</td>
                            <td>-</td>
                            <td>
                              <Button
                                color="primary"
                                className="btn btn-primary m-1"
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
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default Watingforapproval
