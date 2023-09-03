const LOGIN_COLLECTION = require('mongoose').model("LoginCollection");

module.exports = {
    login: (req,res) => {
        try {
            LOGIN_COLLECTION.findOne({email : req.body.email, password: req.body.password})
            .then((user)=>
            {
                if(user != null)
                {
                req.session.LOGIN_USER = user;
                    res.send({
                        isError: false,
                        message: req.session.id,
                        data: user
                });
            }
            })
        }
        catch(error) {
            res.send({
                isError: true,
                message: "wrong details",
                data: error.message,
              });
        }
    }
};

