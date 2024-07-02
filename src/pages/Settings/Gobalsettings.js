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

function Gobalsettings() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Global Settings" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>App Name | Site Logo | Favicon | Country code</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <label>App Name</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter App Name"
                      ></Input>
                    </Col>
                    <Col md={6}>
                      <label>Contry Code</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Country Code"
                      ></Input>
                    </Col>
                    <Row className="mt-3">
                      <Col md={6}>
                        <label>App Name</label>
                        <Input
                          className="form-control"
                          type="file"
                          placeholder="Enter App Name"
                        ></Input>
                      </Col>
                      <Col md={6}>
                        <label>Contry Code</label>
                        <Input
                          className="form-control"
                          type="file"
                          placeholder="Enter Country Code"
                        ></Input>
                      </Col>
                    </Row>
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
                      <h5>Currency</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <label>Currency Name</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter App Name"
                      ></Input>
                    </Col>
                    <Col md={6}>
                      <label>Currency Sign</label>
                      <Input
                        className="form-control"
                        type="text"
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
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default Gobalsettings
