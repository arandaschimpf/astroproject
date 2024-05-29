/* empty css                         */
import { c as createComponent, r as renderTemplate, d as renderHead, e as renderSlot, f as createAstro, m as maybeRenderHead, g as renderComponent } from '../astro_NSQO-Spq.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="bg-zinc-200 flex flex-col items-center"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Usuario/OneDrive/Escritorio/3\xB0 A\xD1O/Programaci\xF3n III/Deploy/astroproject/src/layouts/Layout.astro", void 0);

const $$TaskList = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="tittle">todos</h1> <div class="linea"> <ol class="form"> <li><span class="icon "></span><input id="circleCheckbox1" placeholder="What needs to be done?"> </li> <hr class="hr"> <li><input type="checkbox" class="check" id="circleCheckbox1"><label for="circleCheckbox1">Go Shopping</label></li> <hr class="hr"> <li><input class="check" type="checkbox" id="circleCheckbox2"><label for="circleCheckbox2">Refactor backend</label></li> <hr class="hr"> <li><input class="check" type="checkbox" id="circleCheckbox3"><label for="circleCheckbox3">Add new feature to app</label></li> <hr class="hr"> <li><input class="check" type="checkbox" id="circleCheckbox4"><label for="circleCheckbox4">Todo 1</label></li> <hr class="hr"> </ol> <span class="text1">0 items left</span> <span class="text2">All</span> <span class="text3">Active</span> <span class="text4">Completed</span> <span id="clearCompleted" class="text5">Clear Completed</span> </div>  `;
}, "C:/Users/Usuario/OneDrive/Escritorio/3\xB0 A\xD1O/Programaci\xF3n III/Deploy/astroproject/src/components/TaskList.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const id = Astro2.params.id ?? "1";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pagina" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Tasks", $$TaskList, { "id": id })} ` })}`;
}, "C:/Users/Usuario/OneDrive/Escritorio/3\xB0 A\xD1O/Programaci\xF3n III/Deploy/astroproject/src/pages/[id].astro", void 0);

const $$file = "C:/Users/Usuario/OneDrive/Escritorio/3° AÑO/Programación III/Deploy/astroproject/src/pages/[id].astro";
const $$url = "/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$TaskList as $, _id_ as _, $$Layout as a };
