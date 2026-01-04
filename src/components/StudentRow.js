import React from 'react';
import PropTypes from 'prop-types';

const StudentRow = ({ student, onEdit, onDelete }) => {
  return (
    <tr>
      <td style={{ padding: '10px', fontWeight: 'bold' }}>
        {student.name}
      </td>

      <td style={{ padding: '10px' }}>
        {student.marks.join(', ')}
      </td>

      <td style={{ padding: '10px' }}>
        {student.percentage}%
      </td>

      <td style={{ padding: '10px' }}>
        {student.division}
      </td>

      <td style={{ padding: '10px' }}>
        <button
          onClick={() => onEdit(student)}
          style={{
            padding: '6px 12px',
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
      </td>

      <td style={{ padding: '10px' }}>
        <button
          onClick={() => onDelete(student._id)}
          style={{
            padding: '6px 12px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

StudentRow.propTypes = {
  student: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default StudentRow;
