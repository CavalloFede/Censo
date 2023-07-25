const Select = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Seleccionar</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre || option.ocupacion}
        </option>
      ))}
    </select>
  );
};

export default Select;
