const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const docGiaSchema = new Schema({
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, required: true },
    DiaChi: { type: String, required: true },
    DienThoai: { type: String, required: true },
    Password: { type: String, required: true },
    PasswordResetToken: String,
    PasswordResetExpires: Date, //Mốc thời gian giới hạn việc đặt lại mật khẩu (Vd: Sau 10p)
    isAdmin: { type: Boolean, required: true, default: false }
});

//METHOD
docGiaSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password)
}

//MIDDLEWARE
docGiaSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); //Quyết định độ mạnh mật khẩu
    this.Password = await bcrypt.hash(this.Password, salt);
});



const DocGia = mongoose.model('DocGia', docGiaSchema);

module.exports = DocGia;