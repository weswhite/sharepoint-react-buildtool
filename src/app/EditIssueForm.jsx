import React from 'react';
import request from 'superagent';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export default class EditIssuesForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.issue;
  }
  handleChange(e) {
   this.setState({ value: e.target.value });
 }

  render () {
    return <div>
      <form>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.props.issue.Title}
            placeholder={this.props.issue.Title}
            onChange={this.handleChange}
          />
        <ControlLabel>Team</ControlLabel>
          <FormControl
            type="text"
            value={this.props.issue.Team.Title}
            placeholder={this.props.issue.Team.Title}
            onChange={this.handleChange}
          />
          <ControlLabel>Owner</ControlLabel>
          <FormControl
            type="text"
            value={this.props.issue.Owner.Title}
            placeholder={this.props.issue.Owner.Title}
            onChange={this.handleChange}
          />
          <ControlLabel>Status</ControlLabel>
          <FormControl
            type="text"
            value={this.props.issue.Status}
            placeholder={this.props.issue.Statues}
            onChange={this.handleChange}
          />
          <ControlLabel>Due Date</ControlLabel>
            <FormControl
              type="text"
              value={this.props.issue.DueDate}
              placeholder={this.props.issue.DueDate}
              onChange={this.handleChange}
            />

        </FormGroup>
      </form>
    </div>;


  }
}
