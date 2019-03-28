import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class houseListItem extends Component {
  render() {
    return (
      <Link
        to={`/houses/${this.props.house.id}`}
        className="list-group-item list-group-item-action"
      >
        {this.props.house.name}
      </Link>
    )
  }
}

export default houseListItem
