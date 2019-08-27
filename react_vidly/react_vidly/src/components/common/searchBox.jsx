import React from "react";
import Input from "./input";

const SearchBox = ({ name, placeholder, error, onChange, ...rest }) => {
  return (
    <div>
      <Input
        {...rest}
        name={name}
        placeholder={placeholder}
        error={error}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBox;
