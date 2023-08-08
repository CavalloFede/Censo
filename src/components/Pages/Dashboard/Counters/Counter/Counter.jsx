import "./Counter.css";

const Counter = ({ title, amount }) => {
  return (
    <div className="Counter">
      <h2>
        {title} {amount}
      </h2>
    </div>
  );
};

export default Counter;
