import { useState } from "react";

export function MultiSelectDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");

  const options = ["React", "Vue", "Angular"];

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onMouseOver={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {selected} ▼
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
