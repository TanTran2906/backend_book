const { ObjectId } = require("mongodb");

class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection("NhaXuatBan");
    }

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async delete(id) {
        const result = await this.NhaXuatBan.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const result = await this.NhaXuatBan.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async create(payload) {
        try {
            const result = await this.NhaXuatBan.insertOne(payload);
            return result;
        } catch (error) {
            throw new Error(`Không thể tạo nhà xuất bản: ${error.message}`);
        }
    }
}

module.exports = NhaXuatBanService;
