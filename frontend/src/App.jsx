import './App.css';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function Room(props) {
  return <li>Room {props.info.room_id}: {props.info.name}, price: {props.info.price}</li>;
}

function App() {
  // Thay thế URL API dưới đây bằng endpoint thực tế của bạn nếu cần
  var api = "http://localhost:8080/room";
  const { data, error, isLoading } = useSWR(api, fetcher);

  if (error) return <div style={{ backgroundColor: "#000", color: "#ff4d4d", minHeight: "100vh", padding: "40px", textAlign: "center" }}>failed to load</div>;
  if (isLoading) return <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "40px", textAlign: "center" }}>loading...</div>;

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", textAlign: "center", padding: "40px" }}>
      <header style={{ backgroundColor: "#000" }}>
        {/* Thay đổi đường dẫn ảnh đúng với thư mục public của bạn */}
        <img src="/images/Hirono.jpg" alt="logo" style={{ width: "150px", marginBottom: "20px" }} />
        <h3 style={{ marginBottom: "20px" }}>The quick brown fox jumps over the lazy dog</h3>
        <ul style={{ listStyleType: "none", padding: 0, lineHeight: "1.8" }}>
          {data && data.rooms && data.rooms.map((item) => (
            <Room key={item.room_id} info={item} />
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;