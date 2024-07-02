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

function Payoutvalue() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Pay To Mart"
            breadcrumbItem="Payout Request Validation"
          />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <h5>Payout Request Validation</h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <label>Minimum amount</label>
                      <Input className="form-control" type="text"></Input>
                    </Col>
                    <Col md={6}>
                      <label>Minimum Days</label>
                      <Input className="form-control" type="text"></Input>
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

export default Payoutvalue
