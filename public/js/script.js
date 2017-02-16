(function(){
  document.addEventListener("DOMContentLoaded",function(){
    var guess = document.getElementById("guess");
    var showguess = document.querySelector("#show-guess .number");
    var range = document.querySelector("input[type='range']");
    range.value = 100;
    showguess.innerText = 100;
    console.log(guess , showguess , range);
    function trackMovements(ev){
      showguess.innerText = this.value;
    }
    range.addEventListener('input',trackMovements);
    function tryValue(ev){
      var value = range.value;
      var promise = asyncFetch('/api/check');
      ev.preventDefault();
      
    }
    guess.addEventListener('click',tryValue);
    var asyncFetch = function (url , guess) {
      return promise = new Promise(function(resolve , reject){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', encodeURI(url));
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = function () {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
              }
              else{
                reject({error: xhr.status});
              }
            };
            xhr.send(JSON.stringify({guess:guess }));
      });
    };
  })
})();