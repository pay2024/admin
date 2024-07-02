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

function Mapapi() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Mapapi" />{" "}
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
                    <Col md={6}>
                      <label>Map Box</label>
                      <Input
                        className="form-control"
                        type="radio"
                        placeholder="Enter Country Code"
                      ></Input>
                    </Col>

                    <Col md={6}>
                      <label>Google Map</label>
                      <Input
                        className="form-control"
                        type="radio"
                        placeholder="Enter Country Code"
                      ></Input>
                    </Col>

                    <Col md={12} ClasName="mt-4"> 
                      {" "}
                      <label>Map Box Api Key</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Country Code"  
                      ></Input>
                    </Col>

                    <Col md="4" className="mt-4">
                      <Button color="primary" className="btn btn-primary">
                        {" "}
                        On Map Box
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

export default Mapapi
