const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { addComment, getCommentList }  = require("../controller/comment");

router.prefix("/api/comment");

/**
 * tag list
 */
 router.post("/add", async(ctx, next) => {
    const data = await addComment(ctx);
    ctx.body = new SuccessModel(data);
});

router.get("/getList", async(ctx, next) => {
    const data = await getCommentList(ctx.query);
    ctx.body = new SuccessModel(data);
})

module.exports = router;