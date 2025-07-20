const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const forwardBtn = document.getElementById('forward');
const backwardBtn = document.getElementById('backward');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const searchInput = document.getElementById('search');

let songs = [
  { title: "Jhol", artist: "Maanu and Annural Khalid", file: "songs/song1.mpeg" },
  { title: "Tum hi ho", artist: "Arijith Singh", file: "songs/song2.aac" },
  { title: "Soulmate", artist: "Arijith Singh and Baadshah", file: "songs/song3.mpeg" },
  { title: "Dhokha dhadi", artist: "Arijith Singh and Palak Mucchal", file: "songs/song4.mp3" },
  { title: "Kaise hua", artist: "Vishal Mishra", file: "songs/song5.mp3" },
  { title: "Tujhe Kitna Chahne Lage", artist: "Arijith Singh and Mithoon", file: "songs/song6.mp3" }
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  nextTrack();
});

function nextTrack() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
}

forwardBtn.addEventListener('click', () => {
  audio.currentTime += 10;
});

backwardBtn.addEventListener('click', () => {
  audio.currentTime -= 10;
});

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.backgroundColor = isShuffle ? '#28a745' : '#444';
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.backgroundColor = isRepeat ? '#007bff' : '#444';
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    playSong(); // replay same song
  } else {
    nextTrack();
  }
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function buildPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} — ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });
    playlist.appendChild(li);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );
  playlist.innerHTML = "";
  filtered.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} — ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = songs.indexOf(song);
      loadSong(song);
      playSong();
    });
    playlist.appendChild(li);
  });
});

loadSong(songs[songIndex]);
buildPlaylist();
