module.exports = function(Tweet) {

    Tweet.observe('before save', function(ctx, next) {
      if (ctx.isNewInstance) {

        //console.log(ctx);
        // console.log(ctx.instance.createdAt);
        // console.log(Date.now());
        ctx.instance.createdAt = Date.now();
      } else {
        console.log("Lista");
      }
      next();

    });
};