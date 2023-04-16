import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddBook from "./AddBook";
import Popup from 'reactjs-popup';


class NewBookModal extends Component {
  state = {
    modal: true
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Book";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Add New Book";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Add New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <AddBook
              resetState={this.props.resetState}
              toggle={this.toggle}
              book={this.props.book}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewBookModal;