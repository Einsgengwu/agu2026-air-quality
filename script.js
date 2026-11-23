// Optional resources: add the final public HTTPS URL(s), then redeploy.
// Example: { label: 'Read the paper', url: 'https://doi.org/VERIFIED-DOI' }
const resources = [];
const resourceNav = document.querySelector('#resources');
for (const resource of resources) {
  const url = new URL(resource.url, location.href);
  if (url.protocol !== 'https:') continue;
  const link = document.createElement('a');
  link.href = url.href;
  link.textContent = resource.label;
  resourceNav.append(link);
}
resourceNav.hidden = !resourceNav.childElementCount;

const video = document.querySelector('#research-video');
const fullscreen = document.querySelector('#fullscreen');
const status = document.querySelector('#player-status');
function showStatus(message) {
  status.textContent = message;
  status.hidden = false;
}
async function preferLandscape() {
  if (screen.orientation?.lock) {
    try { await screen.orientation.lock('landscape'); }
    catch { /* Orientation remains under the viewer's device settings. */ }
  }
}
fullscreen.hidden = !(video.requestFullscreen || video.webkitEnterFullscreen);
fullscreen.addEventListener('click', async () => {
  try {
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  } catch {
    showStatus('Use the fullscreen control in the video player, or turn your phone sideways for a wider view.');
  }
});
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement === video) preferLandscape();
  else if (screen.orientation?.unlock) screen.orientation.unlock();
});
video.addEventListener('error', () => {
  showStatus('The video could not load. Check your connection and try the Open video link below.');
});

