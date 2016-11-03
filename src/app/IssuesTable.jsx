import React from 'react';
import request from 'superagent';
import {Table, Button, Modal} from 'react-bootstrap';

export default class IssuesTable extends React.Component {
  constructor(){
    super();
    this.state = {showModal: false};
    //event bindings
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  //functions for the modal(open and close)
  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }

  componentDidMount(){
    var mockIssues = [
        {
          Title: "An Issue",
          Team: {Title: "Team 1"},
          Owner: {Title: "Wes"},
          Status: "Open",
          DueDate: "10/13/2017"
        },
        {
          Title: "Another Issue",
          Team: {Title: "Team 2"},
          Owner: {Title: "Wes"},
          Status: "Open",
          DueDate: "10/13/2018"
        }
      ];

    var baseUrl = "https://magenic365.sharepoint.com/sites/PatrickL/POC";
    var getIssuesColumns = function () {
        return "Id,Owner/Title,Owner/Id, Title, Team/Title,Team/Id,Status, DueDate";
    }
    var getIssuesExpandColumns = function () {
        return "&$expand=Owner/Id, Team/Id";
    }
    var Columns = getIssuesColumns();
    var ExpandColumns = getIssuesExpandColumns();
    var filter = Columns + ExpandColumns;

    request.get(baseUrl + "/_api/web/lists/getbytitle('Issues')/items?$select=" + filter)
    .set('accept', 'application/json;odata=verbose')
    .then((response) => {
      console.log(response);
      this.setState({
        issues: response.body.d.results
      });
    })
    .catch(this.setState({issues: mockIssues}));
  }
  //component markup
  render () {
    var issues = this.state.issues.map((issue) => {
      return <tr key={issue.Id}>
        <td>{issue.Title}</td>
        <td>{issue.Team.Title}</td>
        <td>{issue.Owner.Title}</td>
        <td>{issue.Status}</td>
        <td>{issue.DueDate}</td>
        <td><Button bsStyle="primary" onClick={this.open}>Edit</Button></td>
      </tr>;
    });
    return <div>
      <Table bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Team</th>
            <th>Owner</th>
            <th>Status</th>
            <th>DueDate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issues}
        </tbody>
      </Table>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Edit form here</h4>
        </Modal.Body>
      </Modal>
    </div>;
  }
}
