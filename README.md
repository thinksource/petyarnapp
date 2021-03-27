# Getting Started with Create React App



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configure backend

Create aws-exports.js and inside the aws-exports.js:

```
const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": "XXXXXXXXX",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_XXXXXX",
    "aws_user_pools_web_client_id": "XXXXXXXX",
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://XXXXXXXXXX.appsync-api.us-west-2.amazonaws.com/graphql",
    "aws_appsync_region": "us-west-2",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_user_files_s3_bucket": "picture-XXXXXXX-dev",
    "aws_user_files_s3_bucket_region": "us-west-2"
};
```
or you can also use

### 'amplify init'
### 'amplify add api'
### 'amplify add auth'
### 'amplify add storage'

To build your own network.



## Available Scripts

In the project directory, you can run:


### `yarn install`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Special Setting in this project

1,The picture named with title+owner mode, so you can not repeat your picture title. 
2, Pagenation is depending on  /pages/Home.jsx variable perPage, if you set perpage = 2, you will see the pagenation function more easylist.


### Running instance on web

I build the app on aws:

https://master.d2qdg9km9zqeit.amplifyapp.com/