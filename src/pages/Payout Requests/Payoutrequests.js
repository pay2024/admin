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

function Payoutrequests() {
  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Pay To Mart" breadcrumbItem="Reward List" />{" "}
        <Row>
          <Col md="12">
            {" "}
            <Card className="mini-stats-wid">
              <CardBody>
                <Row className="mb-2">
                  <Col>
                    <h5>Reward List</h5>
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
                          <th>Cart Value</th>
                          <th>Address</th>
                          <th>Total Revenue</th>
                          <th>Bank Account Details</th>
                          <th>Already Paid</th>
                          <th>Pending Balance</th>
                          <th>	Requested amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Pay2Mart - Chirala (8019636360)</td>
                          <td>Chirala</td>
                          <td> 288999</td>{" "}
                          <td>Sbi (11233445)</td>
                          <td>599</td>
                          <td>200</td>
                          <td> 200</td>
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

export default Payoutrequests