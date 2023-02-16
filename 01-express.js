"use strict";

const mongoose = require("mongoose");

let express = require("express"),
    app = express();

const user = 'jonygarcia';
const password = '9jyvbAI96odjR7XW';
const dbname = 'pokemon';
const uri = `mongodb+srv://${user}:${password}@cluster0.59lg6dg.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

app.use(express.static(__dirname + "/public/"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use('/', require('./router/rutas'))
app.use('/pokemon', require('./router/pokemon'))

app
    .use((req, res) => {
        res
            .status(404)
            .render("404", {
                titulo: "Error 404",
                descripcion: "Page Not Found"
            });
    })

    .listen(3000);

console.log("Iniciando Express en el puerto 3000");
