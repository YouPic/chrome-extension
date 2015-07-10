/**
 * @author Niklas Tegnander <niklas@youpic.com>
 */
(function (window, document, undefined) {
  var url = 'https://api.youpic.com/web_image';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var result = JSON.parse(xhr.responseText);

      if (result && result.image_urls) {
        document.querySelector(".bg-photo").style.backgroundImage = 'url(' + result.image_urls.huge + ')';

        var footer = document.createElement("div");
        footer.className = "footer";
        var text = document.createTextNode('Cover by ' + result.user.display_name);
        footer.appendChild(text);

        document.body.appendChild(footer);
      }
    }
  }

  xhr.open("GET", url, true);
  xhr.send();
})(window, document);
