const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

class SachService {
    constructor(client) {
        this.Sach = client.db().collection("Sach");
        this.NhaXuatBan = client.db().collection("NhaXuatBan");
        this.TheoDoiMuonSach = client.db().collection("TheoDoiMuonSach");
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

    async delete(id) {
        const result = await this.Sach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    // async delete(id) {
    //     // Kiểm tra xem sách có tồn tại trong bất kỳ Đơn mượn sách nào hay không
    //     // const bookExistsInDonMuonSach = await this.checkBookExistenceInDonMuonSach(id);
    //     // if (bookExistsInDonMuonSach) {
    //     //     throw new Error("Không thể xóa sách vì đã tồn tại trong Đơn mượn sách");
    //     // }

    //     // Thực hiện xóa sách với id được cung cấp
    //     const result = await this.Sach.deleteOne({ _id: ObjectId(id) });
    //     return result.deletedCount > 0; // Trả về true nếu có sách được xóa, ngược lại trả về false
    // }

    // async checkBookExistenceInDonMuonSach(bookId) {
    //     // Kiểm tra xem sách có tồn tại trong bất kỳ Đơn mượn sách nào hay không
    //     const count = await this.TheoDoiMuonSach.countDocuments({ "MaSach": mongoose.Types.ObjectId(bookId) });
    //     return count > 0;
    // }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractSachData(payload) {
        const book = {
            TenSach: payload.TenSach,
            DonGia: payload.DonGia,
            SoQuyen: payload.SoQuyen,
            NamXuatBan: payload.NamXuatBan,
            TacGia: payload.TacGia,
            HinhAnh: payload.HinhAnh,
            MaNXB: payload.MaNXB,
        };

        // Remove undefined fields
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const result = await this.Sach.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: "after" }
        );
        // console.log(result.value)
        return result.value;
    }

    async create(payload) {
        const document = await this.Sach.create(payload);
        return document;
    }
}
module.exports = SachService;