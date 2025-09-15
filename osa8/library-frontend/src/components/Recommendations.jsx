import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ show, favoriteGenre }) => {
  const books = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  const filteredBooks = favoriteGenre
    ? books.data.allBooks.filter((book) => book.genres.includes(favoriteGenre))
    : books.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favoriteGenre}</b>
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
    </div>
  );
};

export default Recommendations;
