# MARN (Mongo, Apollo, React, Node) Message Board

## React FrontEnd and Apollo-Server BackEnd

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

And include an .env file in the FrontEnd with your GOOGLE AUTH CLIENT ID:

```sh
REACT_APP_GOOGLE_CLIENT_ID=
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
