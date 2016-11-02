import React from 'react';
import request from 'superagent';
import $ from 'jquery';

export default class IssuesTable extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount(){
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
    .catch(this.setState({issues: [{Id: "1", Title: "Me"}, {Id:"2", Title: "You"}]}));
  }
  //component markup
  render () {
    var issues = this.state.issues.map((issue) => {
      return <tr key={issue.Id}>
        <td>{issue.Title}</td>
      </tr>;
    });
    return <table>
        <tbody>
          {issues}
        </tbody>
    </table>;
  }
}
