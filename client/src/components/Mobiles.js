import React from "react";

const Posts = ({ Posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className="mobile_table">
      <tbody>
        {Posts.map((post) => (
          <tr key={post.id}>
            <td className="text-left">{post.title}</td>
            <td className="text-right">
              <button
                href=""
                className="btn btn-info mr-1"
                disabled={this.state.editDisabled}
                onClick={this.onEdit.bind(this, item[0], item[1])}
              >
                Edit
              </button>
              <button
                href=""
                className="btn btn-danger"
                onClick={this.onDelete.bind(this, item[1])}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Posts;
