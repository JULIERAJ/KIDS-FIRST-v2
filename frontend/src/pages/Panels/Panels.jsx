import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export function Panels() {
  retur(
    <Router>
      <Route exact path="/" component={My_Info}></Route>
      <Route exact path="/Co_Parent" component={Co_Parent}></Route>
      <Route exact path="/Kids" component={Kids}></Route>
    </Router>
  );
}
