//cargar el service worker
if('serviceWorker' in navigator){
    console.log('Puedes usar los service worker en tu navegador');

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log('Service Worker registrado con éxito:', reg.scope);
        })
        .catch(err => {
            console.log('Error al registrar el Service Worker:', err);
        });
    });

}else{
    console.log('No puedes usar los service worker en tu navegador');
}


