/**
 * @author Philip Laine <philip.laine@gmail.com>
 * @author Niklas Tegnander <niklas@youpic.com>
 */
(function (window, document, undefined) {
  var url = 'https://api.youpic.com/web_image';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var result = JSON.parse(xhr.responseText);

      if (result && result.image_urls && result.user) {
        document.querySelector('.bg-photo').style.backgroundImage = 'url(' + result.image_urls.huge + ')';

        var display_name = result.user.display_name || result.user.username;

        var author = document.createElement('a');
        author.className = 'author';
        author.href = 'https://youpic.com/' + result.user.username;
        var text = document.createTextNode('Cover by ' + display_name);
        author.appendChild(text);

        document.body.appendChild(author);
      }
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
})(window, document);
