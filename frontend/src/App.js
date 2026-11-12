import './App.css';

function Room(props) {
  return <li>Room {props.info.room_id}: {props.info.name}, price: {props.info.price}</li>;
}

function App() {
  const rooms = [
    { room_id: 1, name: "Room A", price: 1 },
    { room_id: 2, name: "Room B", price: 2 },
    { room_id: 3, name: "Room C", price: 3 },
    { room_id: 4, name: "Room D", price: 4 },
  ];

  return (
    <div className="App" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", textAlign: "center", padding: "20px" }}>
      <header className="App-header" style={{ backgroundColor: "#000" }}>
        <img src="/images/Hirono.jpg" className="App-logo" alt="logo" style={{ width: "150px" }} />
        <h3>The quick brown fox jumps over the lazy dog</h3>
        <ul>
          {rooms.map((item) => <Room key={item.room_id} info={item} />)}
        </ul>
      </header>
    </div>
  );
}

export default App;