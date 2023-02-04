%%fast_load_part%%
(function() {
    const script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      %%jquery_part%%
    });
    document.head.appendChild(script);
})();