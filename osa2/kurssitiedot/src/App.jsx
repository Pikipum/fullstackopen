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

const Course = ({id, name, parts}) => {
  return(
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <ul>
        {courses.map(course => <Course key={course.id} name={course.name} parts={course.parts}/>)}
      </ul>
    </div>
  )
}

export default App