const NotFound = () => {
  const styles = {
    container: {
      height: '100vh', // Establecer la altura de la pantalla completa
    },
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={styles.container}
    >
      <h1>Opps :(</h1>
    </div>
  );
};

export default NotFound;
