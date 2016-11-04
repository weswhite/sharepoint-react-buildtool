import React from 'react';
import request from 'superagent';
import {Modal, Button} from 'react-bootstrap';
import EditIssueForm from './EditIssueForm.jsx';

export default class EditIssuesModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {showModal: false};
    //event bindings
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true});
  }
  //component markup
  render () {
    return <div>
      <Button bsStyle="primary" onClick={this.open}>Edit</Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditIssueForm issue={this.props.issue}/>
        </Modal.Body>
      </Modal>
    </div>;
  }
}
