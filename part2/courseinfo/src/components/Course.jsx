const Content = ({ course }) => {
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        {course.map(({ parts, id, name }) => {
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

const Course = ({ course }) => {
    return (
        <div>
            <Content course={course} />
        </div>
    )   
}

export default Course