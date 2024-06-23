import React, { useState } from "react";
import "./AddModuleForm.css";

function AddModuleForm({ addModule }) {
  const [moduleName, setModuleName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addModule(moduleName);
    setModuleName("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-module-form">
      <input
        type="text"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New Module Name"
        required
      />
      <button type="submit">Add Module</button>
    </form>
  );
}

export default AddModuleForm;
