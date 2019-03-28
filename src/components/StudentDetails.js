import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

class StudentDetails extends Component {
  state = {
    student: {},
    editing: false
  }

  componentDidMount = () => {
    // const house_id = this.props.match.params.house_id
    // const student_id = this.props.match.params.student_id

    // This is the same as the two lines above
    const { house_id, student_id } = this.props.match.params

    axios
      .get(
        `http://localhost:3000/api/houses/${house_id}/students/${student_id}`
      )
      .then(response => {
        this.setState({ student: response.data })
      })
  }

  showDetails = () => {
    // Destructure the object `this.state.student` into individual variables
    const { name, house, born } = this.state.student

    return (
      <ul className="list-group mb-3">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{house}</li>
        <li className="list-group-item">{born}</li>
      </ul>
    )
  }

  updateStudent = form => {
    const { house_id, student_id } = this.props.match.params

    axios
      .put(
        `http://localhost:3000/api/houses/${house_id}/students/${student_id}`,
        { student: form.formData }
      )
      .then(response => {
        this.props.history.push(`/houses/${house_id}`)
      })
  }

  showEditForm = () => {
    // Destructure the object `this.state.student` into individual variables
    const { name, house, born } = this.state.student

    const formSchema = {
      title: 'Student',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: name
        },
        house: {
          type: 'string',
          title: 'house',
          default: house
        },
        born: {
          type: 'date',
          title: 'born',
          default: born
        }
      }
    }

    return <Form schema={formSchema} onSubmit={this.updateStudent} />
  }

  toggleEditing = event => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <>
        {this.state.editing ? this.showEditForm() : this.showDetails()}
        <button className="btn btn-primary mr-3" onClick={this.toggleEditing}>
          Edit
        </button>
        <Link
          to={`/houses/${this.props.match.params.house_id}`}
          className="btn btn-primary"
        >
          Back
        </Link>
      </>
    )
  }
}

export default StudentDetails
