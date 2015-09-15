function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
var etsyAPI = "https://api.etsy.com/v2/listings/active.js?api_key=fegvyux8y5kywcc3miy23b8j&keywords=whiskey&includes=Images,Shop"

fetchJSONP(etsyAPI, function(data){
  var items = data.results;
  console.log(items);
  items.forEach(displayObjects);
});

function displayObjects(item){
  var source   = document.querySelector('#entry-template').innerHTML;
  var template = Handlebars.compile(source);
  var output  = template(item);
  var li = document.querySelector('.item');
  li.insertAdjacentHTML('beforeend', output);
}
