import React, { useRef } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../constants";
import "../../1-css/Paragraphes.css";

const test = {
  time: 1556098174501,
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
  ],
  version: "2.12.4",
};

export default function TextEditor() {
  const instanceRef = useRef(null);

  const handleSave = async () => {
    const savedData = await instanceRef.current.save();
    console.log(savedData);
  };

  return (
    <div className="text-editor" onBlur={() => handleSave()}>
      <EditorJs
        instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}
        data={test}
      />
    </div>
  );
}
