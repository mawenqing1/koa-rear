const router = require("koa-router")();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

/**
 * blog list
 */
router.get("/list", async (ctx, next) => {
    let author = ctx.query.author || "";
    const keyword = ctx.query.keyword || "";

    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel("未登录")
            return;
        }
        author = ctx.session.username;
    }

    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData)
});

/**
 * blog detail
 */
router.get("/detail", async (ctx, next) => {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data)
});

/**
 * create blog
 */
router.post("/new", loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username;
    const data = await newBlog(ctx.request.body);
    ctx.body = new SuccessModel(data)
});

/**
 * update blog
 */
router.post("/update", loginCheck, async (ctx, next) => {
    const data = await updateBlog(ctx.query.id, ctx.query.body);
    if(data) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel("更新失败")
    }
});

/**
 * delete blog
 */
router.post("/delete", loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const data = await deleteBlog(ctx.query.id, author);
    if (data) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel("删除失败")
    }
});

module.exports = router;