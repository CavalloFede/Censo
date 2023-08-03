const Select = ({ options, value, onChange, name }) => {
  return (
    <select
      className="form-control"
      value={value}
      name={name}
      onChange={onChange}
    >
      <option value="">Seleccionar</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre || option.ocupacion}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  options: [
    { id: 1, nombre: 'fede' },
    { id: 2, nombre: 'agus' },
  ],
  value: 'btn-primary',
  name: 'Texto',
  onChange: () => {},
};

export default Select;
