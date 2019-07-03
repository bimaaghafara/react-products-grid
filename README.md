This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
Products Grid
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.


How to run the App
---
npm run start

Features
----
1. products are displayed in a grid.
2. give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id". The products list should be reloaded when a new sorting option is chosen.
3. each product has :
  a. a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying.
  b. a "price" field, in cents. This should be formatted as dollars like `$3.51`.
  c. a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
4. the product grid should automatically load more items as you scroll down.
5. display an animated "loading..." message while the user waits for the data to load.
6. to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
7. when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".
8. Ads features :
  a.  after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header shown in `public/index/html`, but make sure the `?r` query param is randomly generated each time an ad is displayed.
  b. Ads should be randomly selected, but a user must never see the same ad twice in a row.

### What libraries/frameworks/packages