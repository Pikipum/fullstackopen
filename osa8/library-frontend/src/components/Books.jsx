import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const books = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  
  if (books.loading) {
    return <div>loading...</div>;
  }

  console.log(books)

  const genres = Array.from(
    new Set(books.data.allBooks.flatMap((book) => book.genres))
  );

  const filteredBooks = selectedGenre
    ? books.data.allBooks.filter((book) => book.genres.includes(selectedGenre))
    : books.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
