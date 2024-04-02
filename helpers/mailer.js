const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'info@loopintermodal.com',
        pass: 'atojqblfcjpzayyw'
    }
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
}).catch((err)=>{
    console.log('err', err)

})


module.exports = {
    transporter,
}
