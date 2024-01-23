const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <p key={index}>
            {part.name}
            {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce(
      (total, part) => total + part.exercises,
      0
    );

    return (
      <div>
        <p>Number of exercises: {totalExercises}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
