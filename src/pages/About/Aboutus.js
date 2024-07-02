import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Form,
  Button,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

function Aboutus() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Pay To Mart" breadcrumbItem="Aboutus" />{" "}
          <Row>
            <Col md="12">
              {" "}
              <Card className="mini-stats-wid">
                <CardBody>

                <Row className="mb-2">
                    <Col>
                      <div style={{ float: "right" }}>
                        <Button
                          color="primary"
                          className="btn btn-primary mb-1"
                          onClick={() => {
                            tog_small()
                          }}
                        >
                          Edit{" "}
                        </Button>
                      </div>
                      <h5>Aboutus </h5>
                    </Col>
                  </Row>
                  <p>
                    Pay2Mart is INDIA’s 1st Online Super market app started
                    delivering Groceries to Remote location Villages and
                    extended to Towns and Cities, install our Pay2mart app now
                    and get your groceries delivered at your door step with best
                    products with best prices, our motive is to save our
                    Customers money by providing best price to our Customers at
                    Village level. We also cover Most of the Branded products
                    (which products are available in Metro Cities) to our
                    Pay2Mart Customers at Village level doorstep delivery   We
                    started providing our Pay2Mart App Services in Many Small
                    towns and Villages in Andhra Pradesh & Telangana state.
                    Order your Daily Household essentials from our Pay2Mart App,
                    we covered wide range Grocery and staples, Personal care,
                    Baby Care, Beverages, Snack packs, Dairy products,
                    Vegetables, Fruits and Many more products covered in best
                    prices for our valuable customers, enjoy hassle-free Online
                    Groceries shopping and get services to your doorstep from
                    our nearest store. Our source of procurement on Daily House
                    hold essentials is direct contacts from branded companies to
                    avoid duplicate products supply to our Pay2Mart App
                    Customers * Assured quality: We source most of our fruits,
                    vegetables, staples purchase directly from farmers to give
                    our moral support to our Former's in INDIA. Also, we import
                    and supply few branded company products as per our customer
                    needs. Pay2Mart App features: 1. Maximum discount prices
                    guaranteed on all your groceries. 2. On Time Door Step
                    Delivery. 3. Combo Offers Available on Your Monthly savings.{" "}
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal
            size="lg"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
               Edit
              </h5>
              <button
                onClick={() => {
                  setmodal_small(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={e => {
                  handleSubmit1(e)
                }}
              >
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                    <CKEditor
                  editor={ClassicEditor}
                  id="header"
                  // data={text1}
                  // onReady={editor => {
                  //   console.log("Editor is ready to use!", editor)
                  // }}
                  // onChange={(event, editor) => {
                  //   const data = editor.getData()
                  //   setText1(data)
                  // }}
                />
                    </div>
                  </Col>
                </Row>
                <div style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      setmodal_small(false)
                    }}
                    color="danger"
                    type="button"
                  >
                    Cancel <i className="fas fa-times-circle"></i>
                  </Button>
                  <Button className="m-1" color="primary" type="submit">
                    Submit <i className="fas fa-check-circle"></i>
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
        </Container>
      </div>{" "}
    </React.Fragment>
  )
}

export default Aboutus
