const { ObjectId } = require("mongodb");

class SachService {
    constructor(client) {
        this.Sach = client.db().collection("Sach");
        this.NhaXuatBan = client.db().collection("NhaXuatBan");
    }

    async find(filter) {
        const cursor = await this.Sach.find(filter);
        const sachList = await cursor.toArray();

        // Lặp qua từng sách để lấy thông tin nhà xuất bản
        for (const sach of sachList) {
            const nxbId = sach.MaNXB;
            const nxbInfo = await this.getNhaXuatBanInfo(nxbId);
            sach.TenNXB = nxbInfo ? nxbInfo.TenNXB : "Không tìm thấy"; // Thêm thông tin tên NXB vào sách
        }

        return sachList;
    }

    async getNhaXuatBanInfo(nxbId) {
        return await this.NhaXuatBan.findOne({ _id: nxbId });
    }
}
module.exports = SachService;