const { connection } = require("../config/conexionDB.js");
const nodemailer = require("nodemailer");

// Credenciales del email de envio se almacenan en variables de entorno
require("dotenv").config();

function formatsPostSendToken(
    codigobebe,
    formatMailNumber,
    nombreEncargado,
    nombreBebe
) {
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
        ¡Hola! Esperamos que estés teniendo un buen día. Queremos informarle que has recibido una invitación por parte de ${nombreEncargado} para unirte a la gran comunidad de Baby Growtn Hub. Como parte del proceso de registro para vincularte con ${nombreBebe} deberás ingresar el siguiente código del bebé en nuestra pagina de registro https://ti-usr3-cp.cuc-carrera-ti.ac.cr/babygrowthhub/
      </p>
      <br />
      <div class="contenedor-token">
        <p>Código del bebé:</p>
        <p class="text-token">${codigobebe}</p>
      </div>
      <br />
      <p>
        Una vez te registres deberas esperar a que el encargado del pequeño/a te asigne un rol para poder visualizar los diferentes apartados de nuestro sitio web relacionados con el pequeño/a
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

const codigoBebeController = {
    validarCodigoBebe: async (req, res) => {
        try {
            const IDbebe = req.params.idBebe;

            const consulta = `
      SELECT 
        EXISTS(SELECT 1 FROM bebes b WHERE b.IDBebe = ${IDbebe}) 
      AS CodigoValido;
      `;
            const results = await new Promise((resolve, reject) => {
                connection.query(consulta, (error, results) => {
                    if (error) {
                        console.error(
                            "Error al validar el ID del bebe:",
                            error
                        );
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al validar el ID del bebe",
            });
        }
    },
    enviarCodigoBebe: async (req, res) => {
        const codigoBebe = req.body.codigo;
        const email = req.body.email;
        const formatMailNumber = req.body.formatmail;
        const nombreEncargado = req.body.nombreEncargado;
        const nombreBebe = req.body.nombreBebe;

        const emailTransporter = process.env.EMAIL_TRANSPORTER;
        const emailPassword = process.env.PASS_EMAIL_TRANSPORTER;

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
        const tokenMailingFormat = formatsPostSendToken(
            codigoBebe,
            mailNumberInt,
            nombreEncargado,
            nombreBebe
        );

        // Esperar hasta que se envíe el correo electrónico
        const result = await transporter.sendMail({
            from: emailTransporter,
            to: email,
            subject: "Invitación a Baby Growth Hub",
            html: tokenMailingFormat,
        });

        // Verificar si el envío fue exitoso
        if (result.accepted.length > 0) {
            console.log("Correo enviado exitosamente.");
            res.json({ codigoEnviado: true });
        } else {
            console.log("Fallo al enviar el correo.");
            res.json({ codigoEnviado: false });
        }
    },
    vincularAdultoXbebe: async (req, res) => {
        try {
            const IDbebe = req.body.idBebe;
            const IDadulto = req.body.idAdulto;
            const EncargadoPrincipal = req.body.EncargadoPrincipal;
            const IDRol = req.body.IDRol;
            let resultado = false;

            const consulta = `
      INSERT INTO adultosxbebe (IDAdulto, IDBebe, EncargadoPrincipal, IDRol)
      VALUES (${IDadulto}, ${IDbebe}, ${EncargadoPrincipal} , ${IDRol});
      `;
            const results = await new Promise((resolve, reject) => {
                connection.query(consulta, (error, results) => {
                    if (error) {
                        console.error(
                            "Error al insertar el adulto por bebé:",
                            error
                        );
                        reject(error);
                    } else {
                        resultado = true;
                        resolve(results);
                    }
                });
            });

            res.json(resultado);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al insertar el adulto por bebé",
            });
        }
    },
};

module.exports = codigoBebeController;
