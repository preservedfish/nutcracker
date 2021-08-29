# Nutcracker

![GitHub repo size](https://img.shields.io/github/repo-size/preservedfish/nutcracker)
![GitHub license](https://img.shields.io/github/license/preservedfish/nutcracker)

Nutcracker is a web app that makes it easy for cipher enthusiasts (or unlucky Science Olympiad students) to practice some of the most common types of ciphers. 

Check it out here! The interface allows users to solve from a list of ciphers and sign in to save their progress. The frontend is mainly React while the backend is mainly Express + mongoDB.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [`Node.js`](https://nodejs.org/) and `npm`
* You have read [`https://docs.atlas.mongodb.com/getting-started/`](https://docs.atlas.mongodb.com/getting-started/) and set up a database in mongoDB Atlas.

## Installing Nutcracker

To install Nutcracker, follow these steps:

1. Clone the repository:

```bash
$ git clone https://github.com/preservedfish/nutcracker.git
```

2. Install the dependencies in both the `backend` and `frontend` folders (they have separate `package.json` files):

```bash
$ npm install
```

## Using Nutcracker

To use Nutcracker, follow these steps:

1. Add an .env file in the application's root directory with your own values:

```
MONGODB_URI='<mongo uri/connection string>'
PORT=<port number for backend, default 3001>
SECRET='<secret value for signing user tokens>'
```

2. In the `backend` folder, start the backend (accessible at [http://localhost:3001](http://localhost:3001)):

```bash
$ npm start
```

3. In the `frontend` folder, start the frontend (accessible at [http://localhost:3000](http://localhost:3000)):

```bash
$ npm start
```

## Contributing to Nutcracker

To contribute to Nutcracker, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin nutcracker/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).


## License

This project is licensed under the terms of the MIT license.