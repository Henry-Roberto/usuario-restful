let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = app => {

    let route = app.route('/users');

    //LISTAR TODOS OS DADOS
    route.get((req, res) => {
        //db.find({}).sort({ name: 1 }).exec(   Listar os registros no banco por order crescente por name com 1 sendo crescente e -1 decrescente
        db.find({}).sort({ name: 1 }).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }

        });

    });
    //INSERÇÃO DE DADOS
    route.post((req, res) => {

        //Validando erros
        if (!app.utils.validator.user(app, req, res)) return false;
                //|req.body - json p/ inserção
        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    let routeId = app.route('/users/:id');
    //FILTRO POR UM ID
    routeId.get((req, res) => {
        db.findOne({_id:req.params.id}).exec((err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });
    
    //EDIÇÃO DE DADOS
    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

                //|filtro              |req.body - json p/ edição
        db.update({_id:req.params.id}, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });


    routeId.delete((req, res) =>{

        db.remove({_id: req.params.id }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params.id);
            }
        });
    });

};