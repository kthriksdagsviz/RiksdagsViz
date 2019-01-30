# RiksdagsViz


## First time setup:
```
git clone git@github.com:adigladi/RiksdagsViz.git
cd RiksdagsViz
npm install -g nodemon
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

### `npm dev`

Will run both client and server
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


### `npm server`

Launches the server on port 5000

### `npm client`

Runs only the client



