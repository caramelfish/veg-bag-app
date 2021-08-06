import React from "react";

const Names = ({ people }) => (
    <h2>
        Whatever you want for now, {people.map((person) => (
            <span>{person} </span>
        ))}
    </h2>
);

export default Names;
