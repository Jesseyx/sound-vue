# sound-vue

A simple [Soundcloud](http://soundcloud.com/) client build with [vue.js](https://github.com/vuejs/vue), [vue-router](https://github.com/vuejs/vue-router) and [vuex](https://github.com/vuejs/vuex). Creativity and UI based on [sound-redux](https://github.com/andrewngu/sound-redux).

See it in action at [http://sound.yyandty.com](http://sound.yyandty.com/).

Since SoundCloud Team has launched a new API application process, and i can't change my app's redirect URI, the user authentication in action is invalid. If you're interested with the whole project, please clone it and run in local.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Local authentication server setup

to see user authentication in action in your local environment, install and run this server.

```
# run a proxy server for authentication
npm run auth
```

Feedback, issues, etc. are more than welcome!

## License

MIT
