const { ObjectId } = require("mongodb");

class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection("NhaXuatBan");
    }

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.NhaXuatBan.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    async create(payload) {
        const result = await this.NhaXuatBan.insertOne(payload);
        return result.ops[0];
    }

    async update(id, payload) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const update = { $set: payload };
        const result = await this.NhaXuatBan.findOneAndUpdate(filter, update, { returnDocument: "after" });
        return result.value;
    }

    async delete(id) {
        const result = await this.NhaXuatBan.findOneAndDelete({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
        return result.value;
    }
}

module.exports = NhaXuatBanService;
