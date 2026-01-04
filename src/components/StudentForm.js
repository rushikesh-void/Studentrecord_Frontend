import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudentForm = ({ editingStudent, onSubmit, onCancel }) => {
  const emptyForm = {
    name: '',
    marks: ['', '', '', '', '']
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        marks: editingStudent.marks
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingStudent]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z ]*$/.test(value)) {
      setForm({ ...form, name: value });
      setErrors({ ...errors, name: '' });
    }
  };

  const handleMarksChange = (index, value) => {
    if (/^\d*$/.test(value) && Number(value) <= 100) {
      const newMarks = [...form.marks];
      newMarks[index] = value;
      setForm({ ...form, marks: newMarks });
    }
  };

  const validate = () => {
    const err = {};

    if (!form.name.trim()) {
      err.name = 'Name is required';
    }

    form.marks.forEach((m, i) => {
      if (m === '') {
        err[`marks${i}`] = 'Required';
      }
    });

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      marks: form.marks.map(Number)
    });

    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#4169e1' }}>
        {editingStudent ? 'Edit Student' : 'Add New Student'}
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Student Name"
          value={form.name}
          onChange={handleNameChange}
          style={{
            width: '100%',
            padding: '12px',
            border: errors.name ? '2px solid red' : '2px solid #ccc',
            borderRadius: '6px',
            marginBottom: '10px'
          }}
        />
        {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          marginTop: '15px'
        }}>
          {form.marks.map((m, i) => (
            <input
              key={i}
              placeholder={`Sub ${i + 1}`}
              value={m}
              onChange={(e) => handleMarksChange(i, e.target.value)}
              style={{
                padding: '10px',
                border: errors[`marks${i}`] ? '2px solid red' : '2px solid #ccc',
                borderRadius: '6px'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '12px',
              background: '#4169e1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            {editingStudent ? 'Update' : 'Save'}
          </button>

          {editingStudent && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

StudentForm.propTypes = {
  editingStudent: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

export default StudentForm;
