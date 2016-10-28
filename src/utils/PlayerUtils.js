export function getPlayingSongId(player, playlists) {
  if (player.currentSongIndex !== null) {
    const selectedPlaylists = player.selectedPlaylists;
    const playingPlaylistKey = selectedPlaylists[selectedPlaylists.length - 1];
    const playlist = playlists[playingPlaylistKey];

    return playlist.items[player.currentSongIndex];
  }

  return null;
}
