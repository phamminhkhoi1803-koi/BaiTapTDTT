const restify = require('restify');
const { Client } = require('pg');
const corsMiddleware = require('restify-cors-middleware2'); // (Tùy chọn) Để fix lỗi CORS nếu có

const server = restify.createServer();

// Fix lỗi CORS khi Frontend Vite gọi sang Backend
const cors = corsMiddleware({
  origins: ['*'], // Cho phép tất cả các nguồn
});
server.pre(cors.preflight);
server.use(cors.actual);

// Hàm tạo client mới cho mỗi request để tránh lỗi client.end()
function getClient() {
  return new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'myshop', // Sửa lại thành tên DB của bạn nếu khác
  });
}

// Mục 17: Endpoint test kết nối
server.get('/', async function(req, res, next) {
  const client = getClient();
  let db_info = "Database is up & running";
  try {
    await client.connect();
  } catch (e) {
    db_info = "Cannot connect to database!";
    console.log(e);
  } finally {
    await client.end();
  }
  res.send({ Server: "Server is working", Database: db_info });
  return next();
});

// Mục 18: Truy vấn dữ liệu cho bảng room
server.get('/room', async function(req, res, next) {
  const client = getClient();
  const sql = "SELECT * FROM room";
  let result = { rows: [] };
  try {
    await client.connect();
    result = await client.query(sql);
  } catch (e) {
    console.log("Lỗi truy vấn:", e);
  } finally {
    await client.end();
  }
  // Trả về đúng cấu trúc { rooms: [...] } mà App.jsx đang đợi
  res.send({ rooms: result.rows });
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});