import React from 'react';
import Button from './Button';

const FormField = ({ label, name, type = 'text', value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 font-semibold">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
    {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
  </div>
);

const Form = ({ fields, onSubmit, submitText = 'Submit' }) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={formData[field.name] || ''}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      <Button type="submit" variant="primary" className="w-full">
        {submitText}
      </Button>
    </form>
  );
};

export default Form;