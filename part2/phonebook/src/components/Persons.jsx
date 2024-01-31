const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(({ name, number, id }) => (
        <li key={id}>{name} {number}</li>
      ))}
    </ul>
  );
};

export default Persons;