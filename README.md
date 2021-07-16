# MARN (Mongo, Apollo, React, Node) Message Board

## React FrontEnd and Apollo-Server BackEnd

## Author: David Leda

## Installation

Install the dependencies for the FrontEnd and BackEnd separately:

```sh
cd frontend
npm i
cd backend
npm i
```

Include an .env file in the BackEnd with your MongoDB Atlas credentials, a JWT Secret Key, your SendGrip Key and the e-mail address to send notificacions (SENDER) :

```sh
MONGODB_URI=mongodb+srv://username:password@lib-cluster.sdf3n.mongodb.net/mern-graphql?retryWrites=true&w=majority
SECRET_KEY=xxxxxxxxxx
SENDGRIP_KEY=xxxxxxxx
SENDER=email@email.com
```

And include an .env file in the FrontEnd with your Google Auth Client ID and the BackEnd URL:

```sh
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_API_URL=http://localhost:5000
```

First run the BackEnd (it runs on port 5000):

```sh
cd backend
npm run serve
```

Then run the FrontEnd (it runs on port 3000):

```sh
cd frontend
npm start
```

That's it!
