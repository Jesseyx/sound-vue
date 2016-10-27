const routes = [
  {
    path: '/songs',
    name: 'songs',
    alias: '/',
  },
  {
    path: '/me',
    children: [
      {
        path: 'stream',
        name: 'stream',
      },
      {
        path: 'likes',
        name: 'likes',
      },
      {
        path: 'playlists/:id',
        name: 'playlists',
      },
    ],
  },
];

export default routes;
