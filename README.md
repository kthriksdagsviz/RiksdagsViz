# RiksdagsViz


## First time setup:
```
npm install -g nodemon
git clone git@github.com:adigladi/RiksdagsViz.git
cd RiksdagsViz
cd client && yarn install
cd ..
yarn install
```

### Connect to mongodb(admin access)
In root folder, create config.json and fill with

```
{
    "development": {
        "config_id": "development",
        "app_name": "riksviz",
        "app_desc": "A visualization of Riksdagen",
        "node_port": 5000,
        "database": "mongodb+srv://admin:<PASSWORD>@riksdagsviz-7gqgl.mongodb.net/test?retryWrites=true"
    }
}
```
and replace < PASSWORD > with database password (which you can get from Ben 😉 ).



## Available Scripts

In the project directory, you can run:

### `yarn dev`

Will run both client and server
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


### `yarn server`

Launches the server on port 5000

### `yarn client`

Runs only the client



