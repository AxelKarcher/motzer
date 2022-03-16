import './Cell.scss'

function Cell(props) {
  return (
    <div
      id='cellContainer'
      style={{ backgroundColor: props.colors !== undefined && props.colors[props.index] }}
    >
      { props.userInput !== undefined && props.userInput[props.index] }
    </div>
  )
}

export default Cell
