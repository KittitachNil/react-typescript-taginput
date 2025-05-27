import React, { useState, useEffect, useCallback, useRef } from "react";

interface TagInputProps {
  initialTags?: string[];
  separator?: string;
  maxTags?: number;
  onTagsChange?: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  initialTags = [],
  separator = ",",
  maxTags,
  onTagsChange,
  placeholder = "Add new tags...",
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback(
    (newTag: string) => {
      const trimmedTag = newTag.trim();

      if (!trimmedTag) {
        return; // ไม่เพิ่ม Tag ว่างเปล่า
      }

      // ตรวจสอบ ว่ามี tags นี้แล้วหรือยัง
      if (tags.includes(trimmedTag)) {
        setInputValue(""); // เคลียร์ input แม้ว่าจะเป็น tag ซ้ำ
        return;
      }

      // ตรวจสอบจำนวน Tag สูงสุด
      if (maxTags && tags.length >= maxTags) {
        setInputValue(""); // เคลียร์ input ถ้ามี tags ถึง limit
        return;
      }

      setTags((prevTags) => [...prevTags, trimmedTag]);
      setInputValue(""); // เคลียร์ input หลังจากเพิ่ม Tag
    },
    [tags, maxTags]
  );

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // กรณีมี separator ใน input (เช่น พิมพ์ "tag1,tag2")
    if (value.includes(separator)) {
      const parts = value.split(separator);
      parts.forEach((part) => addTag(part));
      setInputValue(""); // เคลียร์ input หลังจากเพิ่ม tag จาก separator
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // ป้องกันการ Submit Form ถ้าอยู่ใน Form
      addTag(inputValue);
    } else if (event.key === "Backspace" && inputValue === "") {
      // เมื่อกด Backspace ในช่องว่าง และมี tag อยู่ ให้ลบ tag สุดท้าย
      if (tags.length > 0) {
        setTags((prevTags) => prevTags.slice(0, prevTags.length - 1));
      }
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  useEffect(() => {
    if (onTagsChange) {
      onTagsChange(tags);
    }
  }, [tags, onTagsChange]);

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500">
      {tags.map((tag: any, index: number) => (
        <div
          key={index}
          className="flex items-center bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full whitespace-nowrap"
        >
          <span className="text-xl">{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label={`Remove tag: ${tag}`}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="flex-1 min-w-[500px] p-1 outline-none bg-transparent"
        style={{ width: `${inputValue.length > 0 ? inputValue.length + 1 : 10}ch` }} // ปรับความกว้างตามเนื้อหา
      />
      {maxTags && tags.length >= maxTags && (
        <span className="text-sm text-red-500 px-2 py-1">
          Max {maxTags} tags reached.
        </span>
      )}
    </div>
  );
};

export default TagInput;
