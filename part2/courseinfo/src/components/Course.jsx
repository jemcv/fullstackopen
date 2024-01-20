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
    return (
      <b>Total of {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises} exercises</b>
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