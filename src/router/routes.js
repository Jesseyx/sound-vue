import SongsContainer from '../containers/SongsContainer.vue';

const routes = [
  {
    path: '/songs',
    name: 'songs',
    alias: '/',
    component: resolve => resolve(SongsContainer),
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
