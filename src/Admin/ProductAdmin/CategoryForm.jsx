import React from "react";

const CategoryForm = ({ item }) => {
  if (item.children && item.children.length > 0) {
    return (
      <>
        <option className="admin_cate_par" value={item.id}>{item.categoryName}</option>
        {item.children.map((child) => (
          <CategoryForm className="admin_cate_child" key={child.id} item={child} />
        ))}
      </>
    );
  } else {
    return <option value={item.id}>{item.categoryName}</option>;
  }
};

export default CategoryForm;