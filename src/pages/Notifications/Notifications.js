import React from "react"
import { Container, Row, Col, Card, CardBody, Button, Input } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

function Notifications() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Pay To Mart"
            breadcrumbItem="Notification to App Users"
          />{" "}
          <Row>
            <Col md="12">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5>Notification to App Users</h5>

                  <div className="mt-3">
                    <label>Store</label>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Select Store"
                    ></Input>
                  </div>

                  <div className="mt-3">
                    <label>Image</label>
                    <Input className="form-control" type="file"></Input>
                  </div>
                  <div className="mt-3">
                    <label>Title</label>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    ></Input>
                  </div>
                  <div className="mt-3">
                    <label>Store</label>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Message"
                    ></Input>
                  </div>
                  <Button color="primary" className="btn btn-sm m-1 mt-3">
                    Send Notification To App Users
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="mini-stats-wid">
                <CardBody>
                  <h5>Notification to Store</h5>

                  <div>
                    <label>Title</label>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    ></Input>
                  </div>
                  <div className="mt-3">
                    <label>Store</label>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Message"
                    ></Input>
                  </div>
                  <Button color="primary" className="btn btn-sm m-1 mt-3">
                    Notification To Store
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

export default Notifications
