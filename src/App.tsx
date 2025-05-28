import { useState } from "react";
import TagInput from "./components/TagInput";
import "./App.css";

function App() {
  const [myTags1, setMyTags1] = useState<string[]>(["react"]);
  const [myTags2, setMyTags2] = useState<string[]>([]);
  const [myTags3, setMyTags3] = useState<string[]>(["web"]);
  const [myTags4, setMyTags4] = useState<string[]>([]);

  const handleTagsChange1 = (newTags: string[]) => {
    setMyTags1(newTags);
  };

  const handleTagsChange2 = (newTags: string[]) => {
    setMyTags2(newTags);
  };

  const handleTagsChange3 = (newTags: string[]) => {
    setMyTags3(newTags);
  };
  const handleTagsChange4 = (newTags: string[]) => {
    setMyTags4(newTags);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tag Input Assignment</h1>

      <div className="bg-white p-6 rounded-lg shadow-md" style={{ width: "100%" }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Example 1. Basic Tag Input
        </h2>
        <TagInput
          initialTags={myTags1}
          onTagsChange={handleTagsChange1}
          placeholder="Add your skills (e.g., html, css)"
        />
        <p className="mt-4 text-gray-600">
          Current tags in parent state:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">
            {myTags1.join(", ")}
          </span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Example 2. Tag Input with Max 4 Tags
        </h2>
        <TagInput
          initialTags={myTags2}
          onTagsChange={handleTagsChange2}
          maxTags={4}
          placeholder="Max 4 tags allowed"
        />
        <p className="mt-4 text-gray-600">
          Current tags in parent state:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">
            {myTags2.join(", ")}
          </span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Example 3. Tag Input with Custom Separator (Ex. semicolon ;)
        </h2>
        <TagInput
          initialTags={myTags3}
          onTagsChange={handleTagsChange3}
          separator=";"
          placeholder="Separate tags with semicolon (;)"
        />
        <p className="mt-4 text-gray-600">
          Current tags in parent state:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">
            {myTags3.join("; ")}
          </span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Example 4. Full option Tag Input (limit 5 tags and add separator ;)
        </h2>
        <TagInput
          initialTags={myTags4}
          onTagsChange={handleTagsChange4}
          maxTags={5}
          separator=";"
          placeholder="Enter what ever you want!"
        />
        <p className="mt-4 text-gray-600">
          Current tags in parent state:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">
            {myTags4.join("; ")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
