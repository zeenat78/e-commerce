import React from "react";


const Base = (props) => {
  return (
    <div>
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="jumbotron  text-white text-center">
          <h1 className="text-capitalize display-font-weight: 300 display-1 ">
            {props.title}
          </h1>
          <p className="lead">{props.description}</p>
        </div>
        <div className="text-white p-4 ">{props.children}</div>
      </div>
      <div className="card text-center mt-auto">
        <div className="card-header bg-secondary">
          Get inspired!Explore all of our terending collections
        </div>
        <div className="card-body bg-dark">
          <h5 className="card-title text-warning">Thanks for Visting</h5>
          <p className="card-text text-white">Feel free to Contact</p>
          <p className="btn btn-success">Contact</p>
        </div>
      </div>
      )
    </div>
  );
};

export default Base;
