import express from "express";
import path from "path";

export const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express(); //Crea una instancia de express

  //Para poder usar middleware de express, se utiliza la palabra app.use
  app.use(express.static(public_path)); //Middleware para servir archivos estáticos

  app.get("", (req, res) => {
    const indexPath = path.join(__dirname + `../../${public_path}/index.html`); //Selecciona el archivo index.html donde esta la pagina estatica

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(err.status).end();
      } else {
        console.log("Archivo enviado:", indexPath);
      }
    }); //Envía el archivo index.html al cliente
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`); //Inicia el servidor y escucha en el puerto especificado
  });
};
