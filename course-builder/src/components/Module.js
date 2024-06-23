import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Resource from "./Resource";
import AddResourceForm from "./AddResourceForm";
import "./Module.css";

function Module({
  module,
  deleteModule,
  renameModule,
  moveModule,
  index,
  moveResourceInModule,
}) {
  const [resources, setResources] = useState(module.resources);

  const addResource = (newResource) => {
    setResources([...resources, newResource]);
  };

  const deleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const renameResource = (id, newName) => {
    setResources(
      resources.map((resource) =>
        resource.id === id ? { ...resource, name: newName } : resource
      )
    );
  };

  const [, ref] = useDrag({
    type: "MODULE",
    item: { id: module.id, index },
  });

  const [, drop] = useDrop({
    accept: "MODULE",
    hover(item) {
      if (item.index !== index) {
        moveModule(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="module">
      <h2>
        <input
          type="text"
          value={module.name}
          onChange={(e) => renameModule(module.id, e.target.value)}
        />
        <button onClick={() => deleteModule(module.id)}>Delete</button>
      </h2>
      <AddResourceForm addResource={addResource} />
      {resources.map((resource, idx) => (
        <Resource
          key={resource.id}
          resource={resource}
          deleteResource={deleteResource}
          renameResource={renameResource}
          index={idx}
          moveResourceInModule={moveResourceInModule}
        />
      ))}
    </div>
  );
}

export default Module;
