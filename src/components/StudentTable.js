import React from 'react';
import PropTypes from 'prop-types';
import StudentRow from './StudentRow';

const StudentTable = ({
  students,
  pagination,
  searchName,
  filterDivision,
  currentPage,
  onSearchChange,
  onFilterChange,
  onPageChange,
  onEdit,
  onDelete
}) => {
  const totalPages = pagination ? pagination.totalPages : 1;

  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#4169e1', marginBottom: '15px' }}>
        Student Records
      </h3>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />

        <select
          value={filterDivision}
          onChange={(e) => onFilterChange(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        >
          <option value="All">All Divisions</option>
          <option value="Distinction">Distinction</option>
          <option value="First Class">First Class</option>
          <option value="Second Class">Second Class</option>
          <option value="Third Class">Third Class</option>
        </select>
      </div>

      {/* Table */}
      <table width="100%" border="1" cellPadding="10">
        <thead style={{ background: '#4169e1', color: 'white' }}>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Percentage</th>
            <th>Division</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {students.length ? (
            students.map((student) => (
              <StudentRow
                key={student._id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              style={{
                margin: '5px',
                padding: '8px 12px',
                background: currentPage === i + 1 ? '#4169e1' : 'white',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: '1px solid #ccc',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  searchName: PropTypes.string.isRequired,
  filterDivision: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default StudentTable;
