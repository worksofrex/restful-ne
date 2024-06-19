import swaggerAutoGen from 'swagger-autogen'
import { env } from './src/utils/env'
const doc = {
  info: {
    title: 'RCA Library management system',
    description: 'Rest api documentation for RCA library management system'
  },
  servers: [
    {
      url: 'http://localhost:3030/api/v1',
      description: 'v1 endpoints server'       
    },
  ],
  tags: [
    {
      name: "Students-Auth",
      descrption: "Student auth endpoints"
    },
    {
      name: "Books",
      descrption: "Books endpoints"
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      StudentSignUpDto: {
        nationalId: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      StudentLoginDto: {
        email: '',
        password: ''
      },
      AddBookDto : {
        name : "",
        author  : "",
        publisher : "",
        publicationYear :  "",
        subject : ""
      },
    }
  },
  host: `http://localhost:${env.PORT}/api/v1`
}

const outputFile = './swagger.json'
const routes = ['./src/api.ts']

swaggerAutoGen({ openapi: '3.0.0' })(outputFile, routes, doc)
