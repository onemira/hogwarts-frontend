import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import HouseList from './components/HouseList'
import House from './components/House'
import CreateHouse from './components/CreateHouse'
import EditHouse from './components/EditHouse'
import StudentDetails from './components/StudentDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <Link to="/" className="display-4">
              Welcome to Hogwarts🧹
            </Link>
            <hr className="my-4" />
            <p className="lead">☠muggles are not allowed!☠ </p>
            <a
              className="btn btn-primary btn-lg"
              href="https://my.pottermore.com/hogwarts"
              role="button"
            >
              Learn more
            </a>
          </div>
          <Switch>
            <Route exact path="/" component={HouseList} />
            <Route exact path="/houses/new" component={CreateHouse} />
            <Route exact path="/houses/:id" component={House} />
            <Route exact path="/houses/edit/:id" component={EditHouse} />
            <Route
              exact
              path="/houses/:house_id/students/:student_id"
              component={StudentDetails}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
