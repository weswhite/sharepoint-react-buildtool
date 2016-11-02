import request from 'superagent';


export default class IssuesTable extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount(){
    //called at component load time
    //this is where we will call the API with the php lib
    var url = "https://magenic365.sharepoint.com/sites/PatrickL/POC/_api/web/lists/getbytitle('Documents')/items";//SP API URL
    request.get(url).then(response) => {
      console.log(response);
    });
  }
  //component markup
  render () {
    return <table>
        <thead>
            <tr>
                <td>Issues</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>issue 1</td>
            </tr>
        </tbody>
    </table>;
  }
}
