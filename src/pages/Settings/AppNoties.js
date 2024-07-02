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

function AppNoties() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Notice in App" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Notice in App</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <label>Status</label>
                      <Input className="form-control" type="radio"></Input>
                    </Col>
    
                    <Col md={6}>
                      <label>DeActive</label>
                      <Input className="form-control" type="radio"></Input>
                    </Col>

                    <Col md={12} ClasName="mt-4">
                      {" "}
                      <label>App Version</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter App Version"
                      ></Input>
                    </Col>

                    <Col md={12} ClasName="mt-4">
                      {" "}
                      <label>Notic</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Notic"
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        Update Message
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

export default AppNoties
