const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const data = await login(username, password);
    if(data.username) {
        //set session
        ctx.session.username = data.username;
        ctx.session.realname = data.realname; 
        ctx.body = new SuccessModel(data,"登陆成功");
        return
    }
    ctx.body = new ErrorModel("登陆失败")
});

// router.get("/session-test", async (ctx, next) => {
//     if(ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++
//     ctx.body = {
//         code: 1,
//         viewCount: ctx.session.viewCount
//     }
// })

module.exports = router;