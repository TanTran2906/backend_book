const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection("NhanVien");
    }

    async login(SoDienThoai, Password) {
        try {
            const user = await this.NhanVien.findOne({ SoDienThoai });
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

module.exports = NhanVienService;
