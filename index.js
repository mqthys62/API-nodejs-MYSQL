// Importer le module express
const express = require("express");
// Importer cors
const cors = require("cors");

// Importer l'instance de sequelize
const sequelize = require("./config/database.config");

// Importer body-parser
const bodyParser = require("body-parser");

// Créer l'instance express
const app = express();

// Configurer cors pour l'instance express
app.use(cors());

// Configurer body-parser pour l'instance express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le port et le stocker dans une variable
const port = 3030;

// Créer une route get sur la racine de notre application web
app.get('/', (req, res) => {
    // res.send("<script>console.log(\"Hello world!\")</script>");
    res.send("Hello world!");
});

// Posts Types routes
app.use('/post-types', require('./src/routes/postType.routes'));
// Create : /post-types/create
// Update : /post-types/update
// GetAll : /post-types
// GetById : /post-types/:id
// Delete : /post-types/delete

// Posts routes
app.use('/posts', require('./src/routes/post.routes'));
// Create : /posts/create
// Update : /posts/update
// GetAll : /posts
// GetById : /posts/:id
// Delete : /posts/delete

// Users routes
app.use('/users', require('./src/routes/user.routes'));
// SignUp : /users/signup
// SignIn : /users/signin


// Lancer le serveur
app.listen(port, async () => {
    try {
        console.log(`Server is running on port ${port}.`);
        // Synchroniser la base de données
        await sequelize.authenticate();
        console.log("Database is connected.");
    } catch (err) {
        console.log(err);
    }
});