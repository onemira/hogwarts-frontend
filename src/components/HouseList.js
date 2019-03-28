import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import HouseListItem from './HouseListItem'

class HouseList extends Component {
  state = {
    houses: [],
    search: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/houses').then(response => {
      this.setState({ houses: response.data })
    })
  }

  onSearchChange = event => {
    this.setState({ search: event.target.value }, () => {
      axios
        .get(`http://localhost:3000/api/houses?search=${this.state.search}`)
        .then(response => {
          this.setState({ houses: response.data })
        })
    })
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.search}
          onChange={this.onSearchChange}
          placeholder="Search"
        />
        <div className="list-group">
          {this.state.houses.map(house => (
            <HouseListItem key={house.id} house={house} />
          ))}
        </div>

        <Link className="btn btn-primary" to="/houses/new">
          {' '}
          Create{' '}
        </Link>
      </>
    )
  }
}

export default HouseList
