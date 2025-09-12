import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import Select from "react-select";

const Authors = (props) => {
  const [authorName, setAuthorName] = useState("");
  const [authorBorn, setAuthorBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const authors = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  }
  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedOption.value, setBornTo: Number(authorBorn) },
    });

    setAuthorName("");
    setAuthorBorn("");
  };

  const options = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  if (!props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born{" "}
          <input
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
        </div>
        <input type="submit" value="update author" />
      </form>
    </div>
  );
};

export default Authors;
