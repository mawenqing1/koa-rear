const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { addComment }  = require("../controller/comment");

router.prefix("/api/comment");

/**
 * tag list
 */
 router.post("/add", async(ctx, next) => {
    const data = await addComment(ctx)
});

module.exports = router;