import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class EditHouse extends Component {
  state = {
    house: {}
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:3000/api/houses/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ house: response.data })
      })
  }

  onSubmit = form => {
    axios
      .put(`http://localhost:3000/api/houses/${this.props.match.params.id}`, {
        house: form.formData
      })
      .then(response => {
        this.props.history.push(`/houses/${this.props.match.params.id}`)
      })
  }

  render() {
    const formSchema = {
      title: 'House',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: this.state.house.name },
        mascot: {
          type: 'string',
          title: 'Mascot',
          default: this.state.house.mascot
        },
        head: { type: 'string', title: 'Head', default: this.state.house.head },
        element: {
          type: 'string',
          title: 'Element',
          default: this.state.house.element
        },
        founder: {
          type: 'string',
          title: 'Founder',
          default: this.state.house.founder
        }
      }
    }
    return (
      <div>
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default EditHouse
