import React from 'react';
import request from 'superagent';
import {Table} from 'react-bootstrap';
import EditIssuesModal from './EditIssuesModal.js';

export default class IssuesTable extends React.Component {
  constructor(){
    super();
    this.state = {};
    this.open = this.open.bind(this);
  }
  componentWillMount(){
    var mockIssues = [
        {
          Id: "1",
          Title: "An Issue",
          Team: {Title: "Team 1"},
          Owner: {Title: "Wes"},
          Status: "Open",
          DueDate: "10/13/2017"
        },
        {
          Id: "2",
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

    var columns = getIssuesColumns();
    var expandColumns = getIssuesExpandColumns();

    var filter = columns + expandColumns;

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

  open(){
    this.child.open();
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
        <td><EditIssuesModal issue={issue}/></td>
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
    </div>;
  }
}
