const restify = require('restify');
const { Client } = require('pg');
const corsMiddleware = require('restify-cors-middleware2');

const server = restify.createServer();

// Fix lỗi CORS khi Frontend Vite gọi sang Backend
const cors = corsMiddleware({
  origins: ['*'],
});
server.pre(cors.preflight);
server.use(cors.actual);

// Hàm tạo client mới cho mỗi request, trỏ đúng sang container db_1
function getClient() {
  return new Client({
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '1234',
    host: process.env.POSTGRES_HOST || 'db_1',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || 'myshop',
  });
}

// Endpoint test kết nối
server.get('/', async function(req, res) {
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
});

// Truy vấn dữ liệu cho bảng room
server.get('/room', async function(req, res) {
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
  res.send({ rooms: result.rows });
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});