import { createApp,provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import './index.css'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import {Cloudinary} from '@cloudinary/url-gen';

// Router
import { Router } from './router';


import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_APP_GRAPHQL_HTTP as string,
})
// Cache implementation
const cache = new InMemoryCache()

// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });   // TODO fix error in build

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    },
    query: {
      fetchPolicy: 'cache-first'
    }
  }
})

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'ddqdrc3ak'
  },
  url: {
    secure: true
  }
});

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient),
      provide("cloudinary", cloudinary)
    },
  
    render: () => h(App),
  });

app.use(Router);

app.mount('#app');
