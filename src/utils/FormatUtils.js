export function formatSongTitle(title) {
  if (!title) {
    return '';
  }

  const arr = title.replace('–', '-').split(' - ');
  return arr[arr.length - 1].split(' (')[0];
}
