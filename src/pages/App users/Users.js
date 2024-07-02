import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Input,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function Users() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="App Users" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      
                      <h5>App Users</h5>
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
                            <th>User  Name</th>
                            <th>User Phone</th>
                            <th>User Email</th>
                            <th>Registation Date</th>
                            <th>Is Verfied</th>
                            <th>Active/Block/Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Peruri revanth</td>
                            <td>	8309280849	</td>
                            <td>2023-02-15 21:24:00</td>
                            <td>Peruri@gmail.com</td>
                            <td>	Verified</td>
                            <td>
                              <Button
                                color="primary"
                                className="btn btn-primary m-1"
                              >
                                <i className="mdi mdi-pencil-outline"></i>Active
                              </Button>

                              <Button
                                color="danger"
                                className="btn btn-danger "
                              >
                                <i className="mdi mdi-delete-outline"></i>Delete
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

export default Users