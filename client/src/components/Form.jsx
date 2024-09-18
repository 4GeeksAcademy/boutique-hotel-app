import React from 'react';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

const FormField = ({ label, name, type = 'text', value, onChange, error }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block mb-2 font-semibold text-text">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            isDarkMode 
              ? 'bg-background-dark text-text border-gray-700 focus:border-primary' 
              : 'bg-background-light text-text-dark border-gray-300 focus:border-primary'
          }`}
          rows={5}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            isDarkMode 
              ? 'bg-background-dark text-text border-gray-700 focus:border-primary' 
              : 'bg-background-light text-text-dark border-gray-300 focus:border-primary'
          }`}
        />
      )}
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

const Form = ({ fields, onSubmit, submitText = 'Submit' }) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const { isDarkMode } = useTheme();

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
    <form onSubmit={handleSubmit} className={`max-w-lg mx-auto p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-background text-text' : 'bg-white text-text-dark'}`}>
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