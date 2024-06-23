import React, { useState } from "react";
import "./AddResourceForm.css";

function AddResourceForm({ addResource }) {
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("link"); // 'link', 'file', 'image', 'pdf'
  const [resourceLink, setResourceLink] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResourceName(selectedFile.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resourceType === "link") {
      addResource({
        id: Date.now(),
        name: resourceName,
        type: resourceType,
        link: resourceLink,
      });
    } else if (["image", "pdf", "file"].includes(resourceType)) {
      addResource({
        id: Date.now(),
        name: resourceName,
        type: resourceType,
        file,
      });
    }
    setResourceName("");
    setResourceLink("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-resource-form">
      <input
        type="text"
        value={resourceName}
        onChange={(e) => setResourceName(e.target.value)}
        placeholder="Resource Name"
        required
      />
      <select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
      >
        <option value="link">Link</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
        <option value="file">File</option>
      </select>
      {resourceType === "link" ? (
        <input
          type="url"
          value={resourceLink}
          onChange={(e) => setResourceLink(e.target.value)}
          placeholder="Resource Link"
          required
        />
      ) : (
        <input
          type="file"
          onChange={handleFileChange}
          accept={
            resourceType === "image"
              ? "image/*"
              : resourceType === "pdf"
              ? ".pdf"
              : "*"
          }
          required
        />
      )}
      <button type="submit">Add Resource</button>
    </form>
  );
}

export default AddResourceForm;
