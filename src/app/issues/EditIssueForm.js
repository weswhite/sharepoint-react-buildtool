import React from 'react';
import request from 'superagent';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import EditIssueSubmit from './EditIssueSubmit.js';

export default class EditIssuesForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.issue;
    console.log("constructor state: ", this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
  }
  handleTitleChange(e) {
   this.setState({ Title: e.target.value });
  }
  handleTeamChange(e) {
   this.setState({ Team: e.target.value });
  }
  handleOwnerChange(e) {
   this.setState({ Title: e.target.value });
  }
  handleStatusChange(e) {
   this.setState({ Status: e.target.value });
  }
  handleDueDateChange(e) {
   this.setState({ DueDate: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();

    var data = {
      Id: this.state.Id,
      Title: this.state.Title,
      Team: this.state.Team.Title,
      Owner: this.state.Owner.Title,
      Status: this.state.Status,
      DueDate: this.state.DueDate,
    };
    data.__metadata = {
        type: "SP.Data.IssuesListItem"
    };
    console.log(data);
    var baseUrl = "https://magenic365.sharepoint.com/sites/PatrickL/POC";
    var restUrl = baseUrl + "/_api/web/lists/getbytitle('Issues')/items(" + data.Id + ")";
    var digestUrl = "/_api/contextinfo?$select=FormDigestValue";
    request.post(baseUrl + digestUrl)
    .set('accept', 'application/json;odata=verbose')
    .then((response) => {
      console.log('digest response value: ', response);
      //then statment to handle digest
      var digest = response.body.d.GetContextWebInformation.FormDigestValue;
      console.log('digest response value: ', digest);
      request.post(restUrl, JSON.stringify(data))
      .set('accept', 'application/json;odata=verbose')
      .set('X-RequestDigest', digest)
      .then((response) => {
        //then statment to handle post response
        console.log('made it to then');
      })
      .catch(console.log('made to catch'));
    });
  }

  render () {
    return <div>
      <form onSubmit={this.updateIssue}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.Title}
            placeholder={this.props.issue.Title}
            onChange={this.handleTitleChange}
          />
        <ControlLabel>Team</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.Team.Title}
            placeholder={this.props.issue.Team.Title}
            onChange={this.handleTeamChange}
          />
          <ControlLabel>Owner</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.Owner.Title}
            placeholder={this.props.issue.Owner.Title}
            onChange={this.handleOwnerChange}
          />
          <ControlLabel>Status</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.Status}
            placeholder={this.props.issue.Statues}
            onChange={this.handleStatusChange}
          />
          <ControlLabel>Due Date</ControlLabel>
            <FormControl
              type="text"
              defaultValue={this.state.DueDate}
              placeholder={this.props.issue.DueDate}
              onChange={this.handleDateChange}
            />
          <Button onClick={this.handleSubmit}>
              Submit
            </Button>
        </FormGroup>
      </form>
    </div>;


  }
}
