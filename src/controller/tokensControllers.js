const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

// Credenciales del email de envio se almacenan en variables de entorno
require("dotenv").config();

function formatsPostSendToken(token, formatMailNumber) {
  let tokenMailingFormat = ``;

  // Formato envio token doble factor
  if (formatMailNumber == 1) {
    tokenMailingFormat = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <style>
          @import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap");

          html{
            font-size: 16px;
          }
          * {
            margin: 0;
            padding: 0;
            color: #253962;
          }

          .contenedor-imagen {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
          img {
            width: 100%;
          }

          .contenedor-texto {
            padding: 50px 50px 50px 50px;
            font-family: "Baloo 2", sans-serif;
            font-weight: 300;
          }

          .contenedor-token {
            display: flex;
            flex-direction: row;
            font-family: "Baloo 2", sans-serif;
            font-size: x-large;
          }

          .text-token {
            margin-left: 2px;
            font-weight: bold;
          }

          footer {
            background-color: #fff2f5;
            padding: 50px;
            align-items: center;
            text-align: center;
          }

          .footer-text {
            color: #fe5a86;
            font-family: "Baloo 2", sans-serif;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="contenedor-imagen">
          <img
            src="https://baby-growth-hub.s3.amazonaws.com/imagenesCorreo/Decoracion+Correo.png"
            alt=""
          />
        </div>
        <div class="contenedor-texto">
          <p>
            ¡Hola! Esperamos que estés teniendo un buen día. Queremos asegurarnos de que tu
            cuenta esté protegida, por lo que hemos implementado la autenticación de
            doble factor en nuestra plataforma.
          </p>
          <p>
            Para completar el proceso de inicio de sesión seguro, simplemente
            utiliza el siguiente "Token de Seguridad" cuando inicies sesión:
          </p>
          <br />
          <div class="contenedor-token">
            <p>Token de Seguridad:</p>
            <p class="text-token">${token}</p>
          </div>
          <br />
          <p>
            Si no ha solicitado este registro o no está familiarizado con él,
            elimine de manera inmediata este correo electrónico.
          </p>
          <br />
          <p>
            <strong>Atentamente, el equipo de Baby Growtn Hub</strong>
          </p>
        </div>
        <footer>
          <div>
            <p class="footer-text">Equipo de Baby Growtn Hub</p>
          </div>
        </footer>
      </body>
    </html>
    
    `;
    // Formato envio token cambio contrasena
  } else if (formatMailNumber == 2) {
    tokenMailingFormat = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
    
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap");
    
          html {
            font-size: 16px;
          }
          * {
            margin: 0;
            padding: 0;
            color: #253962;
          }
    
          .contenedor-imagen {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
          img {
            width: 100%;
          }
    
          .contenedor-texto {
            padding: 50px 50px 50px 50px;
            font-family: "Baloo 2", sans-serif;
            font-weight: 300;
          }
    
          .contenedor-token {
            display: flex;
            flex-direction: row;
            font-family: "Baloo 2", sans-serif;
            font-size: x-large;
          }
    
          .text-token {
            margin-left: 2px;
            font-weight: bold;
          }
    
          footer {
            background-color: #fff2f5;
            padding: 50px;
            align-items: center;
            text-align: center;
          }
    
          .footer-text {
            color: #fe5a86;
            font-family: "Baloo 2", sans-serif;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="contenedor-imagen">
          <img
            src="https://baby-growth-hub.s3.amazonaws.com/imagenesCorreo/Decoracion+Correo.png"
            alt=""
          />
        </div>
        <div class="contenedor-texto">
          <p>
            ¡Hola! Esperamos que estés teniendo un buen día. Nos complace informarle
            de que hemos recibido una solicitud para restablecer la contraseña de su
            cuenta. Para garantizar la protección de sus datos personales, hemos
            generado un código de seguridad único que deberá para completar el
            proceso de restablecimiento.
          </p>
          <p>
            A continuación encontrará el token necesario para proceder con su
            contraseña restablecer:
          </p>
          <br />
          <div class="contenedor-token">
            <p>Token de Seguridad:</p>
            <p class="text-token">${token}</p>
          </div>
          <br />
          <p>
            Si NO ha solicitado un restablecimiento de contraseña, le rogamos encarecidamente que <strong> elimine este correo electrónico inmediatamente </strong> y tome las medidas necesarias para proteger su cuenta
          </p>
          <br />
          <p>
            <strong>Atentamente, el equipo de Baby Growtn Hub</strong>
          </p>
        </div>
        <footer>
          <div>
            <p class="footer-text">Equipo de Baby Growtn Hub</p>
          </div>
        </footer>
      </body>
    </html>
    `;
  }

  return tokenMailingFormat;
}

const tokensController = {
  sendToken: async (req, res) => {
    const email = req.params.email;
    const formatMailNumber = req.params.formatmail;

    // Generar un secreto para el usuario y la comparacion fututa del token
    const secret = speakeasy.generateSecret();

    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    
    console.log(`TOKEN GENERADO: ${token}`);

    const emailTransporter = 'babygrowthhub@gmail.com';
    const emailPassword = 'hycpsbupuealsymr';

    // Configurar el transporte del correo electrónico
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailTransporter,
        pass: emailPassword,
      },
    });

    //Obtener el formato que tendra el correo para envio del token
    const mailNumberInt = parseInt(formatMailNumber);
    const tokenMailingFormat = formatsPostSendToken(token, mailNumberInt);

    // Esperar hasta que se envíe el correo electrónico
    await transporter.sendMail({
      from: emailTransporter,
      to: email,
      subject: "Token doble autenticación Baby Growth Hub",
      html: tokenMailingFormat,
    });

    // El secreto se usará adelante para aplicar la validación
    res.json({ secreto: secret });
  },
  validateToken: (req, res) => {
    // Valida esto por medio del "secret" generado al inicio
    const userEnteredToken = req.body.token;
    const objSecreto = req.body.secreto;

    
    const secreto = objSecreto.secreto;

    const isValidToken = speakeasy.totp.verify({
      secret: secreto.base32,
      encoding: "base32",
      token: userEnteredToken,
      window: 10, // 9 intervalos * 30 segundos por intervalo = 270 segundos
    });

    // NOTA: Parametro window: 1 para aceptar token debido a la diferencia horaria
    res.json({ isValidToken: isValidToken });
  },
};

module.exports = tokensController;
