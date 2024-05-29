import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_NSQO-Spq.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/index.ts","pathname":"/api","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",async function(){await(await fetch(\"/api\")).json()});document.addEventListener(\"change\",e=>{if(!e.target?.matches('input[type=\"checkbox\"]'))return;fetch(\"/api/1\",{method:\"PUT\"})});async function r(e){await fetch(\"/api\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({title:e})})}async function l(){await fetch(\"/api\",{method:\"PATCH\",headers:{\"Content-Type\":\"application/json\"}})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text2\");e&&e.addEventListener(\"click\",d)});function d(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t;n.style.display=\"block\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text3\");e&&e.addEventListener(\"click\",s)});function s(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t.querySelector(\".check\"),c=t;n&&!n.checked?c.style.display=\"block\":c.style.display=\"none\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text4\");e&&e.addEventListener(\"click\",u)});function u(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t.querySelector(\".check\"),c=t;n&&n.checked?c.style.display=\"block\":c.style.display=\"none\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".icon\");e&&e.addEventListener(\"click\",f)});function f(){var e=document.querySelectorAll(\".form li:not(:first-child)\"),t=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(n){if(n){var c=n;c.style.display=\"none\"}else t.forEach(function(a){var i=n;i.style.display=\"none\"})})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.getElementById(\"clearCompleted\");e&&e.addEventListener(\"click\",m)});function m(){var e=document.querySelectorAll(\".check:checked\");e.forEach(function(t){if(t instanceof HTMLInputElement){var n=t.parentElement;n instanceof HTMLElement&&n.remove()}}),l(),o()}document.addEventListener(\"DOMContentLoaded\",function(){console.log(\"DOMContentLoaded event listener is triggered\");var e=document.querySelectorAll(\".check\");e.forEach(function(t){t.addEventListener(\"change\",function(){console.log(\"Checkbox change event is triggered\"),o()})})});function o(){console.log(\"Updating items left...\");var e=document.querySelectorAll(\".check:not(:checked)\"),t=document.querySelector(\".text1\");t&&(t.textContent=e.length+\" item\"+(e.length!==1?\"s\":\"\")+\" left\")}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.getElementById(\"circleCheckbox1\");e&&e.addEventListener(\"keydown\",h);var t=document.querySelector(\".text2\");t&&t.addEventListener(\"click\",n);function n(){var c=document.querySelectorAll(\".check\");c.forEach(function(a){a.addEventListener(\"change\",o)})}});function h(e){if(e.key===\"Enter\"){var t=e.target;if(!t.parentElement)return;var n=t.value.trim();if(n!==\"\"){var c=document.createElement(\"li\");c.innerHTML=`<input type=\"checkbox\" class=\"check\"><label class=\"labelInput\">${n}</label>\n            <hr>`,t.parentElement.appendChild(c),r(n),t.value=\"\"}}}\n"}],"styles":[{"type":"external","src":"/_astro/_id_.ostrYfJy.css"}],"routeData":{"route":"/[id]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",async function(){await(await fetch(\"/api\")).json()});document.addEventListener(\"change\",e=>{if(!e.target?.matches('input[type=\"checkbox\"]'))return;fetch(\"/api/1\",{method:\"PUT\"})});async function r(e){await fetch(\"/api\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({title:e})})}async function l(){await fetch(\"/api\",{method:\"PATCH\",headers:{\"Content-Type\":\"application/json\"}})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text2\");e&&e.addEventListener(\"click\",d)});function d(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t;n.style.display=\"block\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text3\");e&&e.addEventListener(\"click\",s)});function s(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t.querySelector(\".check\"),c=t;n&&!n.checked?c.style.display=\"block\":c.style.display=\"none\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".text4\");e&&e.addEventListener(\"click\",u)});function u(){var e=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(t){var n=t.querySelector(\".check\"),c=t;n&&n.checked?c.style.display=\"block\":c.style.display=\"none\"})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".icon\");e&&e.addEventListener(\"click\",f)});function f(){var e=document.querySelectorAll(\".form li:not(:first-child)\"),t=document.querySelectorAll(\".form li:not(:first-child)\");e.forEach(function(n){if(n){var c=n;c.style.display=\"none\"}else t.forEach(function(a){var i=n;i.style.display=\"none\"})})}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.getElementById(\"clearCompleted\");e&&e.addEventListener(\"click\",m)});function m(){var e=document.querySelectorAll(\".check:checked\");e.forEach(function(t){if(t instanceof HTMLInputElement){var n=t.parentElement;n instanceof HTMLElement&&n.remove()}}),l(),o()}document.addEventListener(\"DOMContentLoaded\",function(){console.log(\"DOMContentLoaded event listener is triggered\");var e=document.querySelectorAll(\".check\");e.forEach(function(t){t.addEventListener(\"change\",function(){console.log(\"Checkbox change event is triggered\"),o()})})});function o(){console.log(\"Updating items left...\");var e=document.querySelectorAll(\".check:not(:checked)\"),t=document.querySelector(\".text1\");t&&(t.textContent=e.length+\" item\"+(e.length!==1?\"s\":\"\")+\" left\")}document.addEventListener(\"DOMContentLoaded\",function(){var e=document.getElementById(\"circleCheckbox1\");e&&e.addEventListener(\"keydown\",h);var t=document.querySelector(\".text2\");t&&t.addEventListener(\"click\",n);function n(){var c=document.querySelectorAll(\".check\");c.forEach(function(a){a.addEventListener(\"change\",o)})}});function h(e){if(e.key===\"Enter\"){var t=e.target;if(!t.parentElement)return;var n=t.value.trim();if(n!==\"\"){var c=document.createElement(\"li\");c.innerHTML=`<input type=\"checkbox\" class=\"check\"><label class=\"labelInput\">${n}</label>\n            <hr>`,t.parentElement.appendChild(c),r(n),t.value=\"\"}}}\n"}],"styles":[{"type":"external","src":"/_astro/_id_.ostrYfJy.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Usuario/OneDrive/Escritorio/3° AÑO/Programación III/Deploy/astroproject/src/pages/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/Usuario/OneDrive/Escritorio/3° AÑO/Programación III/Deploy/astroproject/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BNukPKIW.mjs","/src/pages/index.astro":"chunks/pages/index_B5mBgflr.mjs","/src/pages/api/index.ts":"chunks/pages/index_DlU_V8nH.mjs","\u0000@astrojs-manifest":"manifest_DqJhJF8j.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_1YtkfcWG.mjs","\u0000@astro-page:src/pages/api/[id]@_@ts":"chunks/_id__vFIhb7wt.mjs","\u0000@astro-page:src/pages/api/index@_@ts":"chunks/index_S7OLDTxu.mjs","\u0000@astro-page:src/pages/[id]@_@astro":"chunks/_id__CybV2d4b.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_XJsCllkn.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.Wf-EBtFv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.ostrYfJy.css","/1.jpg","/2.jpg","/3.jpg","/cruz.png","/favicon.svg","/flechita.png","/hot-summer.jpg","/time.jpg","/visto.jpg","/vistoazul.jpg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
