# Merck Playbook

## How to Start
- Clone the repository from CodeBase. 
- Make sure you have **node**, **npm** and **gulp** installed on your machine.
- In your terminal, run '**npm install --global gulp-cli**' to install gulp globally. 
- In your terminal, run '**npm install**' and wait for the dependencies to be installed. 
- If the 'npm-install' command executes without any errors, move to the next step. If there are errors, contact one of the developers.
- In your terminal, run '**npm run build**'. This command will compile the project to a new folder called 'dist', now you can access the project by going to the 'dist' folder.
- For development mode, you can change the files in 'app' folder.
- The production model use the 'dist' folder.

## Note: Gulp, Bootstrap v4.0, jquery, and SCSS are used in this project. 

## How to install Gulp
- Visit [this link](https://gulpjs.com/docs/en/getting-started/quick-start) to see the installation guide.

## How to use Bootstrap
- Visit [this link](https://getbootstrap.com/docs/4.4/getting-started/introduction/) to see the detailed guide of Bootstrap.

## How to use Jquery
- Visit [this link](https://api.jquery.com/) to see the detailed guide of jquery.


## Style guidelines
### The Basics
- Use modular SCSS and separate partials for independent components.
- [Autoprefixer](https://github.com/postcss/autoprefixer): Automatically applies vendor prefixes to all properties when necessary. It also removes outdated vendor-prefixes.
- [Imagemin](https://github.com/imagemin/imagemin): Automatically minify images seamlessly.
- [Babel](https://babeljs.io/docs/en/): Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backward-compatible version of JavaScript in current and older browsers or environments. we are using babel with the gulp to automate this process for production.

### Utilities
- For media-queries use 'respond-to' mixin created in _media-queries partial.
- you can add custom breakpoints using 'variables' and 'respond-to' mixin.