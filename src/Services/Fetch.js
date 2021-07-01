// var serverURL = "http://localhost:8080";
var serverURL = "https://fyle-task-backend.herokuapp.com";

function addResponseToCache(url, response) {
  let responseCache = JSON.parse(localStorage.getItem("RESPONSES")) || {};
  responseCache[url] = response;
  localStorage.setItem("RESPONSES", JSON.stringify(responseCache));
}

function getResponseFromCache(url) {
  let responseCache = JSON.parse(localStorage.getItem("RESPONSES")) || {};
  return responseCache[url];
}

export default {
  get: function(url) {
    let cached = getResponseFromCache(url);
    if (cached) {
      return new Promise((resolve, reject) => {
        resolve(cached);
      });
    }
    return fetch(serverURL + url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        addResponseToCache(url, data);
        return data;
      });
  }
};
