import React from "react";

export default function SearchPage() {
  return (
    <div className="col-lg-8 mx-auto">
      <div className="input-group p-1 bg-light rounded rounded-pill shadow-sm mb-4">
        <div className="input-group-prepend">
          <button
            id="button-addon2"
            type="button"
            className="btn btn-link text-warning"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <input
          type="search"
          placeholder="Tìm Kiếm"
          aria-describedby="button-addon2"
          className="form-control border-0 bg-light"
        />
      </div>
    </div>
  );
}
