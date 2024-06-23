import React from "react";
import "./Resource.css";

function Resource({ resource, deleteResource, renameResource }) {
  const { id, name, type, link, file } = resource;

  const renderResourceContent = () => {
    switch (type) {
      case "link":
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        );
      case "image":
        return <img src={URL.createObjectURL(file)} alt={name} />;
      case "pdf":
        return (
          <embed
            src={URL.createObjectURL(file)}
            type="application/pdf"
            width="200"
            height="200"
          />
        );
      case "file":
        return (
          <a href={URL.createObjectURL(file)} download={name}>
            {name}
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className="resource">
      {renderResourceContent()}
      <input
        type="text"
        value={name}
        onChange={(e) => renameResource(id, e.target.value)}
      />
      <button onClick={() => deleteResource(id)}>Delete</button>
    </div>
  );
}

export default Resource;
