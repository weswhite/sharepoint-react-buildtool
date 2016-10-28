import React from 'react';
import pnp from 'sp-pnp-js';

export default class IssuesTable extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount(){
    //called at component load time
    //this is where we will call the API with the php lib
    var url = "";//SP API URL
    pnp.sp.web.get().then((response) => {
      this.setState({
        data: response
      })
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
