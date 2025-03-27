import React from 'react';
import "./Styles/blogInput.css";

function BlogInput() {
  return (
    <div className='event-full2'>
      <div className="container2">
        <form action="">
          <h1>ADD BLOG</h1>
          <div className="choose-file" >
            <input type="file"  />
          </div>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <input type="text" />
          </div>
          <div className="form-type">
            <label htmlFor=""> Type here</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="changes">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogInput;