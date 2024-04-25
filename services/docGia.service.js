const { ObjectId } = require("mongodb");

class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection("DocGia");
    }

    async login(DienThoai, Password) {
        try {
            const user = await this.DocGia.findOne({ DienThoai });
            if (user && user.Password === Password) {
                // Trả về thông tin người dùng (trừ mật khẩu)
                const { Password, ...userInfo } = user;
                return userInfo;
            } else {
                return null; // Trả về null nếu không tìm thấy hoặc mật khẩu không khớp
            }
        } catch (error) {
            throw error; // Ném lỗi lên controller để xử lý
        }
    }

}

module.exports = DocGiaService;
