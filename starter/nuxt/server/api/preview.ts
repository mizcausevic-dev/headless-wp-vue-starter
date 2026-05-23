export default defineEventHandler(async (event) => {
  const token = getQuery(event).token;
  const slug = getQuery(event).slug ?? "/";

  if (!token || typeof token !== "string") {
    throw createError({ statusCode: 401, statusMessage: "Missing preview token" });
  }

  // In a real starter, validate the signed preview token with WordPress or a shared secret.
  return sendRedirect(event, `/preview${slug}?token=${token}`);
});
