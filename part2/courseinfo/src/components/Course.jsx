
const Course = () => {

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
        <h1>Web Development Curriculum</h1>
        {courses.map(({ parts, id, name }) => {
          const total = parts.reduce((total, part) => total + part.exercises, 0);
  
          return (
            <div key={id}>
              <h1>{name}</h1>
              {parts.map(({ id, name, exercises }) => (
                <div key={id}>
                  <p>{name} {exercises}</p>
                </div>
              ))}
              <b>Total of {total} exercises</b>
            </div>
          );
        })}
      </div>
    );
  };

export default Course