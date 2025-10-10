import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DhVjLqBg.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_CKwcbrAk.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"portfolio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/portfolio","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"sitemap.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/ai-search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/ai-search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ai-search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ai-search.ts","pathname":"/api/ai-search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://webndigital.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/advertising-services/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/ai-services/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/bi-services/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/portfolio.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/src/pages/services/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/ai-search@_@ts":"pages/api/ai-search.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/portfolio@_@astro":"pages/portfolio.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/advertising-services/[slug]@_@astro":"pages/advertising-services/_slug_.astro.mjs","\u0000@astro-page:src/pages/ai-services/[slug]@_@astro":"pages/ai-services/_slug_.astro.mjs","\u0000@astro-page:src/pages/bi-services/[slug]@_@astro":"pages/bi-services/_slug_.astro.mjs","\u0000@astro-page:src/pages/services/[slug]@_@astro":"pages/services/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/mertcansezan/Documents/01_Mertcan/WorkFlow/01_Projeler/31_WebnDigital/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DuaxKSpC.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DmtgrC8V.js","/astro/hoisted.js?q=1":"_astro/hoisted.DgzfD4QH.js","/astro/hoisted.js?q=2":"_astro/hoisted.Dz_IgvSp.js","/astro/hoisted.js?q=3":"_astro/hoisted.CdeKRfO6.js","/astro/hoisted.js?q=4":"_astro/hoisted.Df1DB3Nt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.BlXCUBGE.css","/_astro/_slug_.DrADOlTY.css","/_astro/_slug_.pzFcntGA.css","/_astro/_slug_.DJZSryHT.css","/_astro/about.BHCu06x5.css","/_astro/contact.k01yBeLX.css","/_astro/index.Za5ECM96.css","/_astro/index.DiYPcUva.css","/_astro/portfolio.KB8TljHf.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/browserconfig.xml","/favicon-16x16.png","/favicon-32x32.png","/og-image.png.txt","/robots.txt","/site.webmanifest","/sitemap.xml","/_astro/hoisted.CdeKRfO6.js","/_astro/hoisted.Df1DB3Nt.js","/_astro/hoisted.DgzfD4QH.js","/_astro/hoisted.DmtgrC8V.js","/_astro/hoisted.Dz_IgvSp.js","/favicon.ico/android-icon-144x144.png","/favicon.ico/android-icon-192x192.png","/favicon.ico/android-icon-36x36.png","/favicon.ico/android-icon-48x48.png","/favicon.ico/android-icon-72x72.png","/favicon.ico/android-icon-96x96.png","/favicon.ico/apple-icon-114x114.png","/favicon.ico/apple-icon-120x120.png","/favicon.ico/apple-icon-144x144.png","/favicon.ico/apple-icon-152x152.png","/favicon.ico/apple-icon-180x180.png","/favicon.ico/apple-icon-57x57.png","/favicon.ico/apple-icon-60x60.png","/favicon.ico/apple-icon-72x72.png","/favicon.ico/apple-icon-76x76.png","/favicon.ico/apple-icon-precomposed.png","/favicon.ico/apple-icon.png","/favicon.ico/browserconfig.xml","/favicon.ico/favicon-16x16.png","/favicon.ico/favicon-32x32.png","/favicon.ico/favicon-96x96.png","/favicon.ico/favicon.ico","/favicon.ico/manifest.json","/favicon.ico/ms-icon-144x144.png","/favicon.ico/ms-icon-150x150.png","/favicon.ico/ms-icon-310x310.png","/favicon.ico/ms-icon-70x70.png","/images/ai-algorithms.png","/images/assistenti.png","/images/ceo-profile.png","/images/code-is-yours.png","/images/cto-profile.png","/images/customer-logo-1.png","/images/customer-logo-2.png","/images/customer-logo-3.png","/images/dashboard.png","/images/dev-profile.png","/images/ecommerce-custom.png","/images/finance.png","/images/forecasting.png","/images/ios.png","/images/logistica.png","/images/magazzino.png","/images/mertcan-s.jpeg","/images/og-image.jpg","/images/pagamento.png","/images/planning.png","/images/raccomandazione.png","/images/sentiment.png","/images/tailored-software.png","/images/blog/ai-business.png","/images/blog/ecommerce-success.png","/images/blog/mobile-app-trends.png","/images/blog/restaurant-design.png","/images/blog/seo-strategies.png","/images/blog/web-performance.png","/images/customers/1.png","/images/customers/10.png","/images/customers/11.png","/images/customers/12.png","/images/customers/13.png","/images/customers/2.png","/images/customers/3.png","/images/customers/4.png","/images/customers/5.png","/images/customers/6.png","/images/customers/7.png","/images/customers/8.png","/images/customers/9.png","/images/projects/the-solo-web.png","/about/index.html","/blog/index.html","/contact/index.html","/portfolio/index.html","/services/index.html","/sitemap.xml","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"/d/1gKZXWu4aGDICIHxRXiJReHEygvOXtqNxmKMmMSQ=","experimentalEnvGetSecretEnabled":false});

export { manifest };
