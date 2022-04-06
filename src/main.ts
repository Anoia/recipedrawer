import { createApp,provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import './index.css'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';


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

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  });

app.use(Router);

app.mount('#app');
