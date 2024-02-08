import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {isStarred: false, appointmentList: [], title: '', date: ''}

  onSubmittingForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : null

    console.log(formattedDate)

    const userDetails = {
      id: uuidv4(),
      title,
      formattedDate,
      isFav: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, userDetails],
      title: '',
      date: '',
    }))
  }

  changingStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFav: !eachItem.isFav}
        }
        return eachItem
      }),
    }))
  }

  onClikingStarredButton = () =>
    this.setState(prevState => ({isStarred: !prevState.isStarred}))

  onChangingTitle = event => this.setState({title: event.target.value})

  onChangingDate = event => this.setState({date: event.target.value})

  getDetails = () => {
    const {isStarred, appointmentList} = this.state
    if (isStarred) {
      return appointmentList.filter(each => each.isFav === true)
    }
    return appointmentList
  }

  render() {
    const {title, date} = this.state
    const fullDetailsAccordingToUser = this.getDetails()
    return (
      <div className="padding">
        <form onSubmit={this.onSubmittingForm}>
          <input
            type="text"
            value={title}
            placeholder="title"
            onChange={this.onChangingTitle}
          />
          <br />
          <br />
          <input
            type="date"
            value={date}
            placeholder="select date"
            onChange={this.onChangingDate}
          />
          <br />
          <br />
          <button type="submit">add</button>
        </form>
        <br />
        <hr />
        <button type="button" onClick={this.onClikingStarredButton}>
          Starred
        </button>
        <ul>
          {fullDetailsAccordingToUser.map((eachItem, index) => (
            <AppointmentItem
              eachItem={eachItem}
              index={index + 1}
              key={eachItem.id}
              changingStar={this.changingStar}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Appointments
