/**
 * @author Philip Laine <philip.laine@gmail.com>
 * @author Niklas Tegnander <niklas@youpic.com>
 */
(function (window, document, undefined) {

  var updateTab = function (image_url, username, display_name, profile_image) {
    var bg = document.querySelector('.bg-photo');
    bg.style.backgroundImage = 'url(' + image_url + ')';

    // Fallback if no display name is set
    display_name = display_name === '' ? username : display_name;

    var author_link = document.querySelector('.author a');
    author_link.href = 'https://youpic.com/' + username;
    author_link.innerHTML = display_name + '<span class="profile"></span>'

    var profile = document.querySelector('.profile');
    profile.style.backgroundImage = 'url(' + profile_image + ')';
  };

  // Fetch from cache
  chrome.storage.sync.get('last_result', function (result) {
    if (!result.last_result) return;

    updateTab(result.last_result.image_urls.huge,
      result.last_result.user.username,
      result.last_result.user.display_name,
      result.last_result.user.profile_image_urls.small);
  });

  var url = 'https://api.youpic.com/web_image', xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var result = JSON.parse(xhr.responseText);

      if (result && result.image_urls && result.user) {
        updateTab(result.image_urls.huge, result.user.username,
          result.user.display_name, result.user.profile_image_urls.small);

        // Update cache
        chrome.storage.sync.set({ 'last_result': result }); // Omit callback
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
})(window, document);
