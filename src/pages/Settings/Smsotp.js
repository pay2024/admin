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

function Smsotp() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="SMS/OTP Bys" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Message/OTP Setting</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <label>Massage</label>
                      <Input
                        className="form-control"
                        type="radio"
                        placeholder="Enter App Name"
                      ></Input>
                    </Col>
                    <Col md={4}>
                      <label>Twilio</label>
                      <Input
                        className="form-control"
                        type="radio"
                        placeholder="Enter Country Code"
                      ></Input>
                    </Col>

                    <Col md={4}>
                      <label>Off</label>
                      <Input
                        className="form-control"
                        type="radio"
                        placeholder="Enter Country Code"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Firebase for OTP</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <label>Firebase for OTPs</label>
                      <Input
                        className="form-control"
                        type="switch"
                        placeholder="Enter App Name"
                      ></Input>
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

export default Smsotp
