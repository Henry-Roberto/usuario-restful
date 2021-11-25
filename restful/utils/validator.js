module.exports = {
    user:(app, req, res) => {
        req.assert('_name', 'O nome é obrigátorio.').notEmpty();
        req.assert('_email', 'O e-mail está invalido.').notEmpty().isEmail();

        let errors = req.validationErrors();

        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true
        }
    }
}