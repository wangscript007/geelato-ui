# geelato-vue-sui-admin

## Project setup
```
npm install
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


### Settings ESLint
``` json
"eslintConfig": {
    "root": true,
    "env": {
      "node": true,
      "jquery": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {
      "no-console": 0,
      "vue/require-v-for-key": false
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  }
```

ESLint: Unexpected console statement. (no-console)
```
 "no-console":0
```
ESLint: 'reject' is defined but never used. (no-unused-vars)
```
"no-unused-vars": 'off'
```
ESLint: Elements in iteration expect to have 'v-bind:key' directives
```
"vue/require-v-for-key": false
```

@see https://blog.csdn.net/qq_30817073/article/details/78043553

### Plugin and Modules
1 plugin has 1..n modules

### require
@see http://www.ruanyifeng.com/blog/2015/05/require.html
