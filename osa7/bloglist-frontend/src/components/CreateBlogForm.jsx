import { useState } from "react";
import PropTypes from "prop-types";

const CreateBlogForm = ({ addBlog, blogFormRef, setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBlog({
        title: newTitle,
        author: newAuthor,
        blogUrl: newUrl,
      });
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");

      setErrorMessage(`Blog "${newTitle}" submitted successfully!`);
      setTimeout(() => setErrorMessage(null), 5000);
      if (blogFormRef && blogFormRef.current)
        blogFormRef.current.toggleVisibility();
    } catch (error) {
      setErrorMessage("Could not submit blog.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="blogDiv">
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:{" "}
          <input
            name="title"
            value={newTitle}
            placeholder="blog title"
            id="title-input"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            name="author"
            value={newAuthor}
            placeholder="author name"
            id="author-input"
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          URL:{" "}
          <input
            name="blogUrl"
            value={newUrl}
            placeholder="blog url"
            id="url-input"
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default CreateBlogForm;
