
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Admin = ({ onSubmit, onCancel, departmentToEdit }) => {
  // eslint-disable-next-line react/prop-types
  const [name, setName] = useState(departmentToEdit ? departmentToEdit.name : '');
  // eslint-disable-next-line react/prop-types
  const [description, setDescription] = useState(departmentToEdit ? departmentToEdit.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <div>
      <h2>{departmentToEdit ? 'Edit' : 'Add'} Department</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">{departmentToEdit ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Admin;
