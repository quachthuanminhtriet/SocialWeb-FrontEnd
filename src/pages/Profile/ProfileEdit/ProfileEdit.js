import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./ProfileEdit.scss";
const ProfileEdit = () => {
  return (
    <div className="ProfileEdit">
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ minHeight: "100vh" }}
        >
          <Col xs={7}>
            <div className="user-information">
              <div className="user-information_container">
                <div className="wallpaper">
                  {/* <img src="https://th.bing.com/th/id/R.46a305c6c82622ac5a5bd587ae39be9a?rik=sSmuEHJcfWJhAw&riu=http%3a%2f%2fmattingly.design%2farticles%2fwp-content%2fuploads%2f2020%2f07%2fsilicon-valley-logo-story-arc.jpg&ehk=d5HJJZNDd8ZgByMb8q5Ob4dfopk3QSNJebVH7HFXG8g%3d&risl=&pid=ImgRaw&r=0" /> */}
                </div>

                <div className="avatar">
                  <img src="https://www.flykovalam.com/images/team/01.jpg" />
                </div>
              </div>
            </div>
            <div className="profile-edit_form">
              <div className="profile-edit_info">
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Họ</Form.Label>
                      <Form.Control type="text" placeholder="Họ của bạn" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control type="text" placeholder="Tên của bạn" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Năm sinh</Form.Label>
                      <Form.Control type="text" placeholder="xx/xx/xxxx" />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} xs={4} controlId="formGridAddress1">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control placeholder="+84 xxx xxx xx" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAddress1">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control placeholder="Ví dụ: Quận 3, Thành phố Hồ Chí Minh" />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Khoa</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Chuyên ngành</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Lớp</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Row>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Mô tả bản thân</Form.Label>
                    <Form.Control type="email" placeholder="Mô tả ngắn về bản thân" style={{height: "180px"}} as="textarea"/>
                  </Form.Group>

                  {/* <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}

                  <Button variant="primary" type="submit" style={{marginTop: "40px"}}>
                    Lưu thay đổi
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileEdit;
