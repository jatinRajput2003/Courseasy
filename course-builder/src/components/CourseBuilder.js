import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Module from "./Module";
import AddModuleForm from "./AddModuleForm";
import "./CourseBuilder.css";

function CourseBuilder() {
  const [modules, setModules] = useState([]);

  const addModule = (name) => {
    setModules([...modules, { id: Date.now(), name, resources: [] }]);
  };

  const deleteModule = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const renameModule = (id, newName) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, name: newName } : module
      )
    );
  };

  const moveModule = (fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const [movedModule] = updatedModules.splice(fromIndex, 1);
    updatedModules.splice(toIndex, 0, movedModule);
    setModules(updatedModules);
  };

  const moveResource = (moduleIndex, fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const module = updatedModules[moduleIndex];
    const [movedResource] = module.resources.splice(fromIndex, 1);
    module.resources.splice(toIndex, 0, movedResource);
    setModules(updatedModules);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="course-builder">
        <h1>Course Builder</h1>
        <AddModuleForm addModule={addModule} />
        {modules.map((module, idx) => (
          <Module
            key={module.id}
            module={module}
            deleteModule={deleteModule}
            renameModule={renameModule}
            moveModule={moveModule}
            index={idx}
            moveResource={moveResource}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default CourseBuilder;
