import SongsContainer from '../containers/SongsContainer.vue';
import MeContainer from '../containers/MeContainer.vue';
import SongContainer from '../containers/SongContainer.vue';
import UserContainer from '../containers/UserContainer.vue';

const routes = [
  {
    path: '/songs',
    name: 'songs',
    alias: '/',
    component: resolve => resolve(SongsContainer),
  },
  {
    path: '/songs/:id',
    name: 'song',
    component: resolve => resolve(SongContainer),
  },
  {
    path: '/me',
    component: resolve => resolve(MeContainer),
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
  {
    path: '/users/:id',
    name: 'user',
    component: resolve => resolve(UserContainer),
  },
];

export default routes;
