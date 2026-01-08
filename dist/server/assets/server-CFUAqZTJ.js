import { A as createServerRpc, v as createServerFn, B as getRequestHeader, C as setResponseHeader } from "./worker-entry-Cv73MfJc.js";
import { l as getCartById, m as createCart, o as objectType, s as stringType, p as addToCartWithId, r as removeFromCartWithId, n as numberType, u as updateCartWithId } from "./index-DrgtSF_4.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split(";").map((c) => {
    const [key, ...rest] = c.trim().split("=");
    return [key, rest.join("=")];
  }));
}
const getCartId_createServerFn_handler = createServerRpc("274cd802c5bd7003755661af6ce9586775d2bdf91eda7151ce8ee59403ae9383", (opts, signal) => getCartId.__executeServer(opts, signal));
const getCartId = createServerFn().handler(getCartId_createServerFn_handler, async () => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  return cookies["cartId"] ?? null;
});
const getCart_createServerFn_handler = createServerRpc("b8dd0f36e8a3d268b2086b2789c8b5c9393da68f6d37cb77c92e1a348ae259ed", (opts, signal) => getCart.__executeServer(opts, signal));
const getCart = createServerFn().handler(getCart_createServerFn_handler, async () => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  const cartId = cookies["cartId"] ?? null;
  if (!cartId) {
    return void 0;
  }
  return getCartById(cartId);
});
const createCartAndSetCookie_createServerFn_handler = createServerRpc("e04972e716e4eaa7d3250c0ad2a4fe74dca313e6c2b7f5f1a4485a9477a34ab8", (opts, signal) => createCartAndSetCookie.__executeServer(opts, signal));
const createCartAndSetCookie = createServerFn({
  method: "POST"
}).handler(createCartAndSetCookie_createServerFn_handler, async () => {
  const cart = await createCart();
  if (cart.id) {
    setResponseHeader("Set-Cookie", `cartId=${cart.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
  }
  return cart;
});
const addItem_createServerFn_handler = createServerRpc("5cf9c3a6a631874951b2b70c723ae768c656f9d25c13e75f7589ea7e78ecffec", (opts, signal) => addItem.__executeServer(opts, signal));
const addItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  variantId: stringType()
})).handler(addItem_createServerFn_handler, async ({
  data
}) => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  let cartId = cookies["cartId"] ?? null;
  if (!cartId) {
    const cart = await createCart();
    cartId = cart.id;
    setResponseHeader("Set-Cookie", `cartId=${cartId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
  }
  return addToCartWithId(cartId, [{
    merchandiseId: data.variantId,
    quantity: 1
  }]);
});
const removeItem_createServerFn_handler = createServerRpc("993dd7626a82e831b418163daa2c6f73b30e30efc29a74db84b6d8d61acb95c4", (opts, signal) => removeItem.__executeServer(opts, signal));
const removeItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lineId: stringType()
})).handler(removeItem_createServerFn_handler, async ({
  data
}) => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  const cartId = cookies["cartId"] ?? null;
  if (!cartId) {
    throw new Error("No cart found");
  }
  return removeFromCartWithId(cartId, [data.lineId]);
});
const updateItemQuantity_createServerFn_handler = createServerRpc("0b91da24cdb686267c68b4f84c7dbc7483835cfdf55189086846ab394a92959a", (opts, signal) => updateItemQuantity.__executeServer(opts, signal));
const updateItemQuantity = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lineId: stringType(),
  merchandiseId: stringType(),
  quantity: numberType()
})).handler(updateItemQuantity_createServerFn_handler, async ({
  data
}) => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  const cartId = cookies["cartId"] ?? null;
  if (!cartId) {
    throw new Error("No cart found");
  }
  if (data.quantity === 0) {
    return removeFromCartWithId(cartId, [data.lineId]);
  }
  return updateCartWithId(cartId, [{
    id: data.lineId,
    merchandiseId: data.merchandiseId,
    quantity: data.quantity
  }]);
});
const getCheckoutUrl_createServerFn_handler = createServerRpc("5506db276d8244b0b69096c53b351b028859ab190bb23fa1fc32a67afff26576", (opts, signal) => getCheckoutUrl.__executeServer(opts, signal));
const getCheckoutUrl = createServerFn().handler(getCheckoutUrl_createServerFn_handler, async () => {
  const cookieHeader = getRequestHeader("Cookie");
  const cookies = parseCookies(cookieHeader);
  const cartId = cookies["cartId"] ?? null;
  if (!cartId) {
    return null;
  }
  const cart = await getCartById(cartId);
  return cart?.checkoutUrl ?? null;
});
export {
  addItem_createServerFn_handler,
  createCartAndSetCookie_createServerFn_handler,
  getCartId_createServerFn_handler,
  getCart_createServerFn_handler,
  getCheckoutUrl_createServerFn_handler,
  removeItem_createServerFn_handler,
  updateItemQuantity_createServerFn_handler
};
