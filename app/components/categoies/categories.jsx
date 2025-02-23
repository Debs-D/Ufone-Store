// "use client";
import React from "react";

// import { useState, useEffect } from "react";

const CategorySide = (props) => {
  // export default function ProductCard(props) {
  // const [count, setCount] = useState(null);
  // const { posts, count } = await getData(page, cat);

  return (
    <div className="cardbox list-category">
      <h2 className="font-Inter">Category</h2>

      <ul>
        {props.categories?.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySide;
