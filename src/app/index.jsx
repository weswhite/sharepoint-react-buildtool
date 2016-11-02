import React from 'react';
import {render} from 'react-dom';

import IssuesTable from './IssuesTable.jsx';
//import Other from './Other.jsx';

class App extends React.Component {
  render () {
    return <div><IssuesTable /></div>;
  }
}
render(<App/>, document.getElementById('app'));
