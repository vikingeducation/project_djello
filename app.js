const Koa = require("koa");

const app = new Koa();
const onerror = require("koa-onerror");
const logger = require("koa-logger");
const koaSession = require("koa-session2");

// error handler
onerror(app);

app.use(logger());

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const CONFIG = {
	key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
	maxAge: 86400000 /** (number) maxAge in ms (default is 1 days) */,
	overwrite: true /** (boolean) can overwrite or not (default true) */,
	httpOnly: true /** (boolean) httpOnly or not (default true) */,
	signed: true /** (boolean) signed or not (default true) */
};

const APP_SECRET = process.env.SECRET || "I Like Pickles";
app.keys = [APP_SECRET];

const session = koaSession(CONFIG, app);
app.use(session);

app.use(async (ctx, next) => {
	let n = ctx.session.views || 0;
	debug("app session: %s", n);
	ctx.session.views = ++n;
	await next();
});

module.exports = {
	app,
	session
};
