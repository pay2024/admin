import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Button,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function Cancelledorders() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Cancelled Orders" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Cancelled Orders</h5>
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
                            <th>Cart_id</th>
                            <th>Cart price</th>
                            <th>User</th>
                            <th>Store</th>
                            <th>Delivery Boy</th>
                            <th>Delivery_Date</th>
                            <th>Cancelling Reason</th>
                            <th>Cart Products</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>FBIP63e1</td>
                            <td>2146</td>
                            <td> Baji (9640070226)</td>{" "}
                            <td>Pay2Mart - Chirala (8019636360)</td>
                            <td>0</td>
                            <td>2022-06-01</td>
                            <td> i bought from somewhere else</td>
                            <td>
                              <Button
                                color="primary"
                                className="btn btn-primary m-1"
                              >
                                Details
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

export default Cancelledorders
