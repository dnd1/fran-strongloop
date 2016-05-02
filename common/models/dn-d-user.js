module.exports = function(DndUser) {

    DndUser.observe('before save', function(ctx, next) {
      if (ctx.isNewInstance) {
        //console.log(ctx);
        // console.log(ctx.instance.createdAt);
        // console.log(Date.now());
        ctx.instance.createdAtt = Date.now();
      } else {
        console.log("Lista");
      }
      next();
    });

    DndUser.afterRemote('**', function (ctx, user, next) {
      //console.log(" nNO entreo");
      //console.log(ctx.result);
      if(ctx.result) {
        //console.log("entreo");
        if(Array.isArray(ctx.result)) {
          ctx.result.forEach(function (result) {
            delete result.password;
          });
        } else {
          delete ctx.result.password;
        }
      }
      //console.log(ctx.result);
    });
};
