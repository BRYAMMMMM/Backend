const mailgun = require('mailgun-js');

const DOMAIN = 'sandbox0b446323e6ce48b8aa6f0c729066f940.mailgun.org';
const mg = mailgun({ apikey: '5bc14352191cc397fad321ead99b79cd-d8df908e-0972d45e', domain: DOMAIN});


const sendNewUserNotification = (name, surname) => {
  const adminEmail = 'bryamperalta@hotmail.com';

  const data = {
    from: 'abenavidese@est.ups.edu.ec',
    to: adminEmail,
    subject: 'Confirmacion de un nuevo usuario registrado',
    text:'Hola Admin, \n\n Un nuevo usuario se ha registrado en la plataforma. \n\nNombre: ${name} ${surname} /n/n !revisa en la base de datos para mas detalles'};

  mg.messages().send(data, (error, body) =>{
    if (error){
       console.log('Error al enviar correo:', error);
       } else {
         console.log('Correo de notificacion enviado al administrador:', body);
     }
});
};
module.exports = { sendNewUserNotification};
