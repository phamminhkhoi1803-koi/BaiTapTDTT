exports.seed = async function(knex) {
  // Xóa dữ liệu cũ nếu có
  await knex('User').del();
  // Chèn ít nhất 10 dòng dữ liệu mẫu
  await knex('User').insert([
    { username: 'user1', fullname: 'Nguyen Van A', email: 'a@gmail.com' },
    { username: 'user2', fullname: 'Tran Thi B', email: 'b@gmail.com' },
    { username: 'user3', fullname: 'Le Van C', email: 'c@gmail.com' },
    { username: 'user4', fullname: 'Pham Thi D', email: 'd@gmail.com' },
    { username: 'user5', fullname: 'Hoang Van E', email: 'e@gmail.com' },
    { username: 'user6', fullname: 'Vu Thi F', email: 'f@gmail.com' },
    { username: 'user7', fullname: 'Bui Van G', email: 'g@gmail.com' },
    { username: 'user8', fullname: 'Dang Thi H', email: 'h@gmail.com' },
    { username: 'user9', fullname: 'Ngo Van I', email: 'i@gmail.com' },
    { username: 'user10', fullname: 'Duong Thi K', email: 'k@gmail.com' }
  ]);
};