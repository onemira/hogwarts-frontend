import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

const Student = props => {
  const deleteStudent = event => {
    axios
      .delete(
        `http://localhost:3000/api/houses/${props.house.id}/students/${
          props.student.id
        }`
      )
      .then(response => {
        props.loadHouse()
      })
  }

  return (
    <li key={props.student.id} className="list-group-item">
      <Link to={`/houses/${props.house.id}/students/${props.student.id}`}>
        {props.student.name}
      </Link>
      <button className="btn btn-danger float-right" onClick={deleteStudent}>
        x
      </button>
    </li>
  )
}

class House extends Component {
  state = {
    house: {
      students: []
    }
  }

  loadHouse = () => {
    axios
      .get(`http://localhost:3000/api/houses/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data)
        this.setState({ house: response.data })
      })
  }

  componentDidMount() {
    this.loadHouse()
  }

  deleteHouse = event => {
    console.log('Deleting House', this.state.house.id)
    axios
      .delete(`http://localhost:3000/api/houses/${this.state.house.id}`)
      .then(response => {
        this.props.history.push('/')
      })
  }

  renderStudents = () => {
    if (this.state.house.students.length === 0) {
      return <></>
    }

    return (
      <ul className="list-group mb-3">
        <li className="list-group-item active d-flex justify-content-between align-items-center ">
          Students:
          <span className="badge badge-warning badge-pill">
            {this.state.house.student_count} Students
          </span>
        </li>
        {this.state.house.students.map(student => (
          <Student
            key={student.id}
            house={this.state.house}
            student={student}
            loadHouse={this.loadHouse}
          />
        ))}
      </ul>
    )
  }

  addStudent = form => {
    axios
      .post(
        `http://localhost:3000/api/houses/${this.state.house.id}/students`,
        {
          student: form.formData
        }
      )
      .then(response => {
        // Reload the house
        this.loadHouse()
      })
  }

  addStudentForm = () => {
    const formSchema = {
      title: 'Add Student',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: ''
        },
        // house: {
        //   type: 'string',
        //   title: 'House',
        //   default: ''
        // },
        born: {
          type: 'string',
          format: 'date',
          title: 'Born'
        }
      }
    }
    return <Form schema={formSchema} onSubmit={this.addStudent} />
  }

  render() {
    return (
      <>
        <ul className="list-group mb-3">
          <li className="list-group-item active">{this.state.house.name}</li>
          <li className="list-group-item">Mascot: {this.state.house.mascot}</li>
          <li className="list-group-item">
            Element: {this.state.house.element}
          </li>
          <li className="list-group-item">Head: {this.state.house.head}</li>
          <li className="list-group-item">
            Founder: {this.state.house.founder}
          </li>
        </ul>
        {this.renderStudents()}
        {this.addStudentForm()}
        <div className="mb-3">
          <Link
            to={`/houses/edit/${this.state.house.id}`}
            className="btn btn-primary mr-2"
          >
            Edit
          </Link>
          <button className="btn btn-danger" onClick={this.deleteHouse}>
            Delete
          </button>
        </div>
      </>
    )
  }
}

export default House
