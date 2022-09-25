import React from "react";
import { Form, Image } from "react-bootstrap";
import search from "../images/search.svg";

const SearchBar = ({ placeHolder, handleSearch }) => {
  return (
    <div>
      <Form className="searchbar-form">
        <div className="custom-input-group position-relative">
          <Form.Control
            type="text"
            placeholder={placeHolder}
            className="searchbar-form__control"
            onChange={handleSearch}
          />
          <Image className="custom-input-group__prefix" src={search} />
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
