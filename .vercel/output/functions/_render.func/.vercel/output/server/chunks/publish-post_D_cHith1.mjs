import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/publish-post.ts
var publish_post_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	return json({ error: "Server misconfiguration: env vars missing" }, 500);
};
var GET = () => json({
	status: "ok",
	endpoint: "POST /api/publish-post"
}, 200);
function json(data, status) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/publish-post@_@ts
var page = () => publish_post_exports;
//#endregion
export { page };
