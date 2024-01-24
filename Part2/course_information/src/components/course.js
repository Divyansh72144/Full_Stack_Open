const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Header = ({ courseName }) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  );
};

const Sum = ({ parts }) => {
  return (
    <div>
      total of {parts.reduce((sum, part) => sum + part.exercises, 0)} excercises
    </div>
  );
};

export default Course;
