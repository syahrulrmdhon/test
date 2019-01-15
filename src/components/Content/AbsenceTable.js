import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios'

export default class AbsenceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      modal: false
    };
  }

  componentDidMount() {
    Axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const users = res.data;
      this.setState({
        users
      });
    })
  }
  
  render() {
    return (
      <div className="table-content">
        <Table className="absences-detail__table" bordered striped responsive>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jam Pelajaran</th>
            <th>Mata Pelajaran</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.users.map( (user, index) => {
            return <tr key={index}>
              <td>{user.name}</td>
              <td>{user.company.catchPhrase}</td>
              <td>{user.id}</td>
              <td>{user.id}</td>
            </tr>
          })
        }
        </tbody>
        </Table>
      </div>
    )
  }
}
