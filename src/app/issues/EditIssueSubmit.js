import React from 'react';
import request from 'superagent';
import {Button} from 'react-bootstrap';

export default class EditIssueSubmit extends React.Component {
  constructor(props){
    super(props);
    this.updateIssue = this.updateIssue.bind(this);
  }
  updateIssue(){
    console.log("issue passed to upday function: ", this.props.issue.Id);

    var data = {
      Id: this.props.issue.Id,
      Title: React.findDOMNode(this.refs.title).value,
      Team: React.findDOMNode(this.refs.team).value,
      Status: React.findDOMNode(this.refs.status).value,
      DueDate: React.findDOMNode(this.refs.dueDate).value,
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
      <Button onClick={this.updateIssue}>
        Edit
      </Button>
    </div>;


  }
}
