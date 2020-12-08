# Empty Vue 3 App

## Project setup
```
npm install
```

## For performance testing 

### Run the application in production mode:

1) Install `serve` 
```
npm install -g serve
```

2) Build the application
```
npm run build
```

3) Launch the app from the generated `dist` folder
```
serve -s dist
```

4) Access to the page at `http://localhost:5000`

5) Open the chrome's console, go to the `Lighthouse` tab and run an audit with the Performance box checked (you can remove the other checkboxes)

### Measure the bundle size:

```
npm run build-report
```

Note: If you want to run the build-report command on your own vue 3 app, you need to add the command in the `package.json`.
```
    "build-report": "vue-cli-service build --report",
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
