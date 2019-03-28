import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class CreateHouse extends Component {
  onSubmit = form => {
    axios
      .post('http://localhost:3000/api/houses', {
        house: form.formData
      })
      .then(response => {
        this.props.history.push('/')
      })
  }

  render() {
    const formSchema = {
      title: 'House',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: '' },
        mascot: { type: 'string', title: 'Mascot', default: '' },
        head: { type: 'string', title: 'Head', default: '' },
        element: { type: 'string', title: 'Element', default: '' },
        founder: { type: 'string', title: 'Founder', default: '' }
      }
    }

    return (
      <div>
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default CreateHouse
