document.addEventListener('DOMContentLoaded', () => {
  const addSongBtn = document.getElementById('addSongBtn');
  const songTitleInput = document.getElementById('songTitle');
  const songArtistInput = document.getElementById('songArtist');
  const playlistContainer = document.getElementById('playlist');
  const sortPlaylistBtn = document.getElementById('sortPlaylistBtn');
  const clearPlaylistBtn = document.getElementById('clearPlaylistBtn');
  const searchInput = document.getElementById('searchInput');
  const feedbackElement = document.getElementById('feedback');

  let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

  // Function to display feedback messages
  function showFeedback(message, type = 'success') {
    feedbackElement.innerHTML = `<div class="feedback ${type}">${message}</div>`;
    setTimeout(() => feedbackElement.innerHTML = '', 3000); // Clear feedback after 3 seconds
  }

  // Function to display the playlist
  function displayPlaylist(filteredPlaylist = playlist) {
    playlistContainer.innerHTML = ''; // Clear existing playlist
    if (filteredPlaylist.length === 0) {
      playlistContainer.innerHTML = '<p>Your playlist is empty!</p>';
      return;
    }
    filteredPlaylist.forEach((song, index) => {
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
      showFeedback('Song added successfully!');
      displayPlaylist();
    } else {
      showFeedback('Please enter both song title and artist.', 'error');
    }
  });

  // Function to remove a song from the playlist
  window.removeSong = function(index) {
    playlist.splice(index, 1);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    showFeedback('Song removed successfully!');
    displayPlaylist();
  };

  // Function to sort the playlist alphabetically by song title
  sortPlaylistBtn.addEventListener('click', () => {
    playlist.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem('playlist', JSON.stringify(playlist));
    showFeedback('Playlist sorted!');
    displayPlaylist();
  });

  // Function to clear the playlist
  clearPlaylistBtn.addEventListener('click', () => {
    playlist = [];
    localStorage.setItem('playlist', JSON.stringify(playlist));
    showFeedback('Playlist cleared!');
    displayPlaylist();
  });

  // Function to search the playlist
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredPlaylist = playlist.filter(song =>
      song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    displayPlaylist(filteredPlaylist);
  });

  // Display the playlist on page load
  displayPlaylist();
});
