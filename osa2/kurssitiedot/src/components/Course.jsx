const Course = ({id, name, parts}) => {

    const Header = (props) => {
    return (
        <div>
        <h1>{props.name}</h1>
        </div>
    )
    }

    const Part = (props) => {
    return (
        <div>
        <li>
            {props.name} {props.exercises}
        </li>
        </div>
    )
    }

    const Content = (props) => {
    return(
        <div>
        <ul>
            {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </ul>
        </div>
    )
    }

    const Total = (props) => {
    const total = props.parts.map(part => part.exercises).reduce((s, p) => s + p);
    return (
        <div>
        <p>Number of exercises {total}</p>
        </div>
    )
    }
  return(
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default Course