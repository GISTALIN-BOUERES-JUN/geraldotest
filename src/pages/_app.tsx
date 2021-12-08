import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { makeServer } from '../services/mirage'
import { GlobalStyle } from '../styles/global'
import { createServer, Model } from 'miragejs';

/*
if (process.env.NODE_ENV === 'development') {
  makeServer();
}*/


createServer({
  models: {
    user: Model,

  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          firstName: 'Geraldo',
          lastName: 'Boueres',
          email: 'geraldoboueres@gmail.com',
          phoneNumber: '6477030186',
          
        },

        {
          id: 2,
          firstName: 'Viviane',
          lastName: 'Boueres',
          email: 'viviane@gmail.com',
          phoneNumber: '6477030186',
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';
    this.get('/users', () => {
      return this.schema.all('user')

    })

    this.post('/users', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('user', data.user);

    })

    this.del('/users', (schema, request) => {
      
      return this.schema.find('user', 'id=1');

    })
  }
})



function MyApp({ Component, pageProps }: AppProps) {
  return(
   
    <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    <GlobalStyle />
    </ChakraProvider>
 

  )
}

export default MyApp