if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered !', reg))
        .catch(errr => console.log('Service Worker NOT Registered !' + errr));
}