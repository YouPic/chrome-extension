/**
 * @author Philip Laine <philip.laine@gmail.com>
 * @author Niklas Tegnander <niklas@youpic.com>
 */
(function (window, document, undefined) {

  var updateTab = function (data) {
    var bg = document.querySelector('.bg-photo');
    bg.style.backgroundImage = 'url(' + data.image + ')';

    var author_link = document.querySelector('.author a');
    author_link.href = data.user_link;
    author_link.innerHTML = data.display_name + '<span class="profile"></span>'

    var profile = document.querySelector('.profile');
    profile.style.backgroundImage = 'url(' + data.profile_image + ')';
  };

  // Fetch from cache
  chrome.storage.sync.get('data', function (result) {
    if (!result.data) return;

    updateTab(result.data);
  });

  var url = 'https://api.youpic.com/web_image', xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var result = JSON.parse(xhr.responseText);

      if (result && result.image_urls && result.user) {
        var profile_image = (result.user && result.user.profile_image_urls
          && result.user.profile_image_urls.small) 
          || 'https://youpic.com/images/avatar/avatar-32.png';

        var data = {
          user_link: 'https://youpic.com/' + result.user.username, 
          display_name: result.user.display_name,
          image: result.image_urls.huge,
          profile_image: profile_image
        }

        updateTab(data); // Display image

        // Update cache
        chrome.storage.sync.set({ 'data': data }); // Omit callback
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
})(window, document);
