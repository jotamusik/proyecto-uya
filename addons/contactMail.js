function sendMyMail(req, res) {

    var nodemailer = require("nodemailer");

    var userAccount = process.env.USERACCOUNT;
    var mailPass = process.env.MAILPASS;

    let name = req.body.contactName;
    let email = req.body.contactEmail;
    let asunto = req.body.asunto;
    let message = req.body.message;

    let myText = "Enviado por: " + name + "\nemail de contacto: " + email + "\n" + message + "\n";


    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: userAccount,
            pass: mailPass
        }
    });

    console.log("Mail Settings Done...");

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: userAccount, // sender address
        to: userAccount, // list of receivers
        subject: asunto, // Subject line
        text: myText // plaintext body
    };

    console.log("Mail Data Done...");

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if ( error ) {
            res.render('mail', {title: 'Error', error: true});
        }
        else {
            res.render('mail', {title: 'Mensaje enviado', error: false});
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });

}

module.exports = {
    sendMyMail
};
