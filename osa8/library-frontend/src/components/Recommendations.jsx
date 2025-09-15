import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ show, favoriteGenre }) => {
  const books = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } });
  
  if (!show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

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
          {books.data.allBooks.map((a) => (
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
