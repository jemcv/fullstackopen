const Persons = ({ persons, onClick }) => {
  return (
    <ul>
      {persons.map(({ name, number, id }) => (
        <li key={id}>
          {name} {number} &nbsp;
          <button onClick={() => onClick(id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;