const Header = ({name}) => (
  <h1>{name}</h1>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>  
)

const Content = (props) => {
  console.log("Content", props)
  const { parts } = props

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  let sum = 0
  for (let index = 0; index < props.parts.length; index++) {
    sum += props.parts[index].exercises
  }

  return (
    <b>Number of exercises {sum}</b>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
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
        {courses.map(course =>
          <Course key={course.id} course={course} />
        )}
      </ul>
    </div>
  )
}

export default App