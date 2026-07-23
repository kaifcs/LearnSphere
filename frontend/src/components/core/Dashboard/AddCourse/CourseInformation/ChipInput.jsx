import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || []);
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [course, editCourse, name, register]);

  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const chipValue = event.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        setChips((prev) => [...prev, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips((prev) => prev.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={name}
        className="text-sm text-richblack-5"
      >
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        className="flex w-full flex-wrap gap-y-2"
        aria-live="polite"
      >
        {chips.map((chip, index) => (
          <div
            key={`${chip}-${index}`}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            <span>{chip}</span>

            <button
              type="button"
              className="ml-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={() => handleDeleteChip(index)}
              aria-label={`Remove tag ${chip}`}
              title={`Remove ${chip}`}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
          autoComplete="off"
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
      </div>

      {errors[name] && (
        <span
          id={`${name}-error`}
          className="ml-2 text-xs tracking-wide text-pink-200"
        >
          {label} is required.
        </span>
      )}
    </div>
  );
}