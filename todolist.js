/** TLV 14/07/2019
* TP de la todo list d'OpenClassrooms
* Il m'a fallu installer :
* - express (npm install express)
* - ejs (npm install ejs)
* - body-parser (npm install body-parser)
* - cookie-session (npm install cookie-session)
*/
//on inclut express au projet
var express = require('express');
var session = require('cookie-session');
//On ajoute body-parse pour récupérer les retours de POST
var bodyParser = require('body-parser');

//On crée un objet express (besoin de faire ça pour utiliser les fonctionnalités du framework)
var app=express();

//Besoin de faire cette commande pour récupérer des données en POST
app.use(bodyParser.urlencoded({ extended: false }));
//Stockage en session des cookies
app.use(session({secret: 'todotopsecret'}));

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.get('/',function(req,res) {
    res.render('todolist.ejs', {todolist: req.session.todolist});
})

.get('/supp_todo/:id', function(req,res){
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id,1);
    }
    //On utilise redirect pour éviter de mettre le nom du fichier dans plusieurs endroits en même temps
    res.redirect('/');
})

.post('/ajout_todo', function(req,res){
    if (req.body.nouvelletache!=''){
        req.session.todolist.push(req.body.nouvelletache);
    }
    res.redirect('/');
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/');
})

app.listen(8080);
