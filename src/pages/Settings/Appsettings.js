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

function Appsettings() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="App Settings" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>FCM Server Key</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mt-3">
                      <label>User FCM Server Key</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter User FCM Server Key"
                      ></Input>
                    </Col>

                    <Col md={12} className="mt-3">
                      <label>Store FCM Server Key</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Store FCM Server Keys"
                      ></Input>
                    </Col>

                    <Col md={12} className="mt-3">
                      <label>Driver FCM Server Key</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Driver FCM Server Key"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Time Slot</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <label>Open Hours</label>
                      <Input className="form-control" type="time"></Input>
                    </Col>
                    <Col md={4}>
                      <label>Close Hours</label>
                      <Input className="form-control" type="time"></Input>
                    </Col>
                    <Col md={4}>
                      <label>Close Hours</label>
                      <Input className="form-control" type="time"></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Delivery Charge Setting</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Free Delivery value (min)</label>
                      <Input
                        className="form-control"
                        type="number"
                        placeholder="Enter Free Delivery value (min)"
                      ></Input>
                    </Col>
                    <Col md={6}>
                      <label>Delivery Charges</label>
                      <Input
                        className="form-control"
                        type="number"
                        placeholder="Enter Delivery Charges"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Payment Method Setting</h5>
                      <p>Razorpay is ON </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <label>Select Your Payment Method</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Select Your Payment Method"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Order Value</h5>
                      <p>Set minimum and maximum cart value</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Min Value</label>
                      <Input
                        className="form-control"
                        type="number"
                        placeholder="Enter >Min Value"
                      ></Input>
                    </Col>
                    <Col md={6}>
                      <label>Maxmum Value</label>
                      <Input
                        className="form-control"
                        type="number"
                        placeholder="Enter Maxmum Value"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default Appsettings
