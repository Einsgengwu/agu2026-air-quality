// Optional resources: add the final public HTTPS URL(s), then redeploy.
// Example: { label: 'Read the paper', url: 'https://doi.org/VERIFIED-DOI' }
const resources = [{ label: 'Read the paper', url: 'https://doi.org/10.1021/acs.est.6c04494' }];
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
const playButton = document.querySelector('#play-video');
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
// Call play directly in the click handler to retain Safari's user activation.
playButton.hidden = false;
playButton.addEventListener('click', () => {
  if (!video.paused) {
    video.pause();
    return;
  }
  if (video.error) video.load();
  showStatus('Loading video…');
  video.play().catch(() => {
    playButton.hidden = false;
    showStatus('Playback could not start. Tap Play video to try again, or choose Open video.');
  });
});
video.addEventListener('play', () => { playButton.hidden = true; });
video.addEventListener('pause', () => { playButton.hidden = false; });
video.addEventListener('playing', () => { status.hidden = true; });
video.addEventListener('waiting', () => { showStatus('Buffering… Playback will continue when more video has loaded.'); });
video.addEventListener('stalled', () => { showStatus('The video is taking longer to load. You can also choose Open video.'); });
video.addEventListener('error', () => {
  playButton.hidden = false;
  showStatus('The video could not load. Tap Play video to try again, or choose Open video.');
});

