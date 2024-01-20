const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part, id) => (
                <p key={id}>{part.name} {part.exercises}</p>
            ))}
        </div>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <b>Total of {total} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total  course={course} />
        </div>
    )   
}

export default Course