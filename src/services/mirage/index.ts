import { createServer, Model } from 'miragejs'


export function makeServer(){
     createServer ({
        
        models: {
            user: Model,
        },

        /*(server){
            server.db.loadData({

        }, */

        seeds(server) {
            server.db.loadData({
                users: [
                    {
                        id: 1,
                        firstName: "Geraldo",
                        lastName: "Boueres",
                        email: "geraldoboueres@gmail.com",
                        phoneNumber: "64770301886",
                    },
                    {
                        id: 2,
                        firstName: "Viviane",
                        lastName: "Gates",
                        email: "vivianegates@gmail.com",
                        phoneNumber: "9020239230",
                    },


                ]
            })
        },
        
        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', () => {
                return this.schema.all('user')
            } )
            this.passthrough()

            this.post ('/users', (schema, request) =>{
                const data = JSON.parse(request.requestBody)

                return schema.create('user', data);
            })
/*
            this.post('/users', (schema, request) =>{
                let data = JSON.parse(request.requestBody)
                return schema.db.emails.insert(data)
            })

            this.put('/users', (schema, request) =>{
                const data = JSON.parse(request.requestBody)
                return schema.create('users', data)
            })

          
*/
        }
    })

    return server;
}