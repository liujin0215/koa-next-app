import Router from "@koa/router";
import Koa from "koa";
import next from "next";
import { parse } from "url";

async function serve() {
    const dev = process.env.NODE_ENV !== 'production'

    const server = new Koa()
    const router = new Router()
    router.get('/api/hello', ctx => {
        ctx.body = {
            data: 'hello'
        }
    })
    server.use(router.routes())

    const app = next({
        dev,
    })
    await app.prepare()
    const handle = app.getRequestHandler()
    server.use(async (ctx, next) => {
        const parsedUrl = parse(ctx.req.url!, true)
        await handle(ctx.req, ctx.res, parsedUrl)
        ctx.respond = false
        await next()
    })

    const port = 3000
    server.listen(port, () => {
        console.log(`Now listening on: ${port}. Press CTRL+C to shut down.`)
    })
}

serve()