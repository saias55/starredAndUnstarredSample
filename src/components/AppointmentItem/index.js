// Write your code here
const AppointmentItem = props => {
  const {eachItem, index, changingStar} = props
  const {formattedDate, title, isFav, id} = eachItem

  const star = isFav ? 'starred' : 'notstarred'

  const clickingStar = () => changingStar(id)

  return (
    <li>
      <p>serial no {index}</p>
      <h1>{title}</h1>
      <p>{formattedDate}</p>
      <button type="button" onClick={clickingStar}>
        {star}
      </button>
    </li>
  )
}

export default AppointmentItem
