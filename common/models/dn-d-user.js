module.exports = function(DndUser) {

    DndUser.observe('before save', function(ctx, next) {
        if (ctx.isNewInstance) {
            ctx.instance.createdAt = Date.now();
        }
      next();
    });

    DndUser.afterRemote('findById', function (ctx, user, next) {
        if(ctx.result) {
            delete ctx.result.password;
            delete ctx.result.password.fullName;
      }
      next();
    });

    DndUser.greet = function(idd,cb){
        //console.log("Implement");
        res = ""
        DndUser.findById(idd).then(
            function(user){
            //console.log("AQUI",user);
            res = user.fullName.toLowerCase().replace(" ","-") +"-"+String(idd);  
            cb(null,res);
            }
        ).catch(cb);

        console.log(res);

    }

    DndUser.remoteMethod('greet',
    {
        accepts: {arg:'id', type:'number'},
        returns: {arg:'nickname', type:'string'},
        http: {path: '/greet', verb: 'get'}
    }); 
};
