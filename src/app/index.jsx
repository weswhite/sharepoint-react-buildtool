import React from 'react';
import {render} from 'react-dom';

import IssuesTable from './issues/IssuesTable.js';

class App extends React.Component {
  render () {
    return <div><IssuesTable /></div>;
  }
}
render(<App/>, document.getElementById('app'));
