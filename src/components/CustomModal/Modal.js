import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  
  return (
    <div className="CustomModal">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide} >
            Đóng
          </Button>
          <Button variant="primary">Hoàn thành hồ sơ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
