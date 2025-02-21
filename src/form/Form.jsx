import React, { useEffect, useState } from "react";

const Form = () => {
  const initialForm = { name: "", email: "", employeeId: "", joiningDate: "" };
  const initialErrors = {
    name: "Name must be at least 4 characters long and only contain letters and spaces",
    email: "Email must be a valid email address",
    employeeId: "Employee ID must be exactly 6 digits",
    joiningDate: "Joining Date cannot be in the future",
  };
  const [form, setForm] = useState(initialForm);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || value.length < 4) error = initialErrors.name;
        break;
      case "email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = initialErrors.email;
        break;
      case "employeeId":
        if (!value || !/^\d{6}$/.test(value)) error = initialErrors.employeeId;
        break;
      case "joiningDate":
        if (!value || new Date(value) > new Date())
          error = initialErrors.joiningDate;
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleOnSubmit = () => {
    setForm(initialForm);
    setErrors(initialErrors);
    console.log(form);
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => err === "");

    setIsSubmitable(noErrors);
  }, [errors]);

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <div className="flex flex-col w-1/2">
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleOnChange}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div className="flex flex-col w-1/2">
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleOnChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col w-1/2">
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          name="employeeId"
          value={form.employeeId}
          placeholder="Employee ID"
          onChange={handleOnChange}
        />
        {errors.employeeId && (
          <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
        )}
      </div>
      <div className="flex flex-col w-1/2">
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="date"
          name="joiningDate"
          value={form.joiningDate}
          onChange={handleOnChange}
        />
        {errors.joiningDate && (
          <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>
        )}
      </div>
      <button
        className={`px-4 py-2 rounded-md text-white ${
          isSubmitable
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        type="submit"
        disabled={!isSubmitable}
        onClick={handleOnSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
