const openai = require("@/utils/openai");
async function intentClassifier(messages) {
  const result = await openai.send({
    model: "gpt-4o-mini",
    temperature: 0.7,
    input: [
      {
        role: "system",
        content: `
Nhiệm vụ duy nhất của bạn là xác định ý định/mong muốn của khách hàng dựa vào tối đa 5 tin nhắn gần nhất của khách hàng.

Danh sách agents:
- accountAgent
- profileAgent
- postAgent
- commentAgent
- defaultAgent

Cách thức phân loại:
- Đọc tin nhắn theo trình tự từ cũ tới mới, xác định ý định chính của khách hàng và chọn agent phù hợp nhất.
- Cách thức chọn agent:
   - "accountAgent": khi khách hàng hỏi về tài khoản, đăng ký, đăng nhập, mật khẩu, xác thực.
   - "profileAgent": khi khách hàng muốn chỉnh sửa thông tin cá nhân (avatar, bio, tên hiển thị, email…).
   - "postAgent": khi khách hàng muốn tạo bài viết, chỉnh sửa, xoá, hoặc hỏi cách xem bài viết.
   - "commentAgent": khi khách hàng muốn thêm, sửa, xoá bình luận.
   - "defaultAgent": khi không xác định được hoặc ngoài các trường hợp trên.

Cách thức phản hồi:
- Trả về DUY NHẤT tên agent KHÔNG KÈM THEO BẤT CỨ KÝ TỰ NÀO. Ví dụ: "accountAgent"
- Luôn trả về "defaultAgent" khi không xác định được agent phù hợp.

Các tin nhắn gần đây của khách hàng:
`,
      },
      ...messages,
    ],
  });

  return result;
}

module.exports = intentClassifier;
