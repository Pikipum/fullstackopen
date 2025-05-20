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
  let total = 0
  for (let i = 0; i < props.parts.length; i++) {
    total += props.parts[i].exercises
  }
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App