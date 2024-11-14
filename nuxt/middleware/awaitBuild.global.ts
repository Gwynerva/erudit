export default defineNuxtRouteMiddleware(async () => {
    if (import.meta.client) return;
    await $fetch('/api/awaitBuild');
});