export default defineEruditConfig({
    debug: {
        deepLogs: true,
        slowTransition: true,
        fakeApi: {
            content: true,
            languages: true,
        }
    },
    //
    language: 'en',
    content: {
        repository: 'math-ok/ru.omath.net',
        branch: 'main',
    },
    shared: 'math-ok/shared',
    ads: {
        leftBlockId: 'R-A-2185026-3',
        bottomBlockId: 'R-A-2185026-1',
    },
});