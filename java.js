document.addEventListener('DOMContentLoaded', () => {
  const addSongBtn = document.getElementById('addSongBtn');
  const songTitleInput = document.getElementById('songTitle');
  const songArtistInput = document.getElementById('songArtist');
  const playlistContainer = document.getElementById('playlist');
  const sortPlaylistBtn = document.getElementById('sortPlaylistBtn');
  const clearPlaylistBtn = document.getElementById('clearPlaylistBtn');

  let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

  // Function to display the playlist
  function displayPlaylist() {
    playlistContainer.innerHTML = ''; // Clear existing playlist
    playlist.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${song.title} by ${song.artist}</span>
        <button onclick="removeSong(${index})">Remove</button>
      `;
      playlistContainer.appendChild(li);
    });
  }

  // Function to add a song to the playlist
  addSongBtn.addEventListener('click', () => {
    const title = songTitleInput.value.trim();
    const artist = songArtistInput.value.trim();

    if (title && artist) {
      const song = { title, artist };
      playlist.push(song);
      localStorage.setItem('playlist', JSON.stringify(playlist));
      songTitleInput.value = '';
      songArtistInput.value = '';
      displayPlaylist();
    }
  });

  // Function to remove a song from the playlist
  window.removeSong = function(index) {
    playlist.splice(index, 1);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
  };

  // Function to sort the playlist alphabetically by song title
  sortPlaylistBtn.addEventListener('click', () => {
    playlist.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
  });

  // Function to clear the playlist
  clearPlaylistBtn.addEventListener('click', () => {
    playlist = [];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
  });

  // Display the playlist on page load
  displayPlaylist();
});