import React from "react"
import { Container, Row, Col, Card, CardBody, Button, Input } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function BulkUpload() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Pay To Mart"
            breadcrumbItem="Bulk Upload products and varients"
          />{" "}
          <Row>
            <Col md="12">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5>Products Upload</h5>
                  <p>
                    If you want to see example and format of .csv file click
                    here
                  </p>
                  <div className="mt-3">
                    <Input className="form-control" type="file"></Input>
                  </div>
                  <Button color="primary" className="btn btn-sm m-1 mt-3">
                    Bulk Product Upload
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5>Product Varients Upload</h5>
                  <p>
                    If you want to see example and format of .csv file click
                    here
                  </p>
                  <div className="mt-3">
                    <Input className="form-control" type="file"></Input>
                  </div>
                  <Button color="primary" className="btn btn-sm m-1 mt-3">
                    Bulk Varients Upload
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default BulkUpload
