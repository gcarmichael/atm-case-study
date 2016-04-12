## Prerequisites

[Node.js](http://nodejs.org/) must be installed.

## Installation

```shell
# Clone the repository
> git clone https://github.com/DeloitteDigitalUK/atm-case-study.git

# Install dependencies
> cd atm-case-study
> npm install
```
* Running `npm install` in the app's root directory will install everything you need for development.

## Development Server

* `npm start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

* `npm run test-utils` will run the unit tests for the Utils module.
* `npm run test-utils:watch` will run the unit tests for the Utils module on every change.


## Building

* `npm run build` creates a production build by default.

   To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

* `npm run clean` will delete built resources.

## Project structure

Here you can see the structure for this repo:

```
|-- atm-case-study
    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- README.md
    |-- nwb.config.js
    |-- package.json
    |-- public
    |   |-- app.css
    |   |-- index.html
    |-- src
    |   |-- index.js
    |   |-- components
    |   |   |-- atm.js
    |   |   |-- balance.js
    |   |   |-- main.js
    |   |   |-- navigation.js
    |   |   |-- withdraw.js
    |   |-- router
    |   |   |-- AppRouter.js
    |   |-- utils
    |       |-- utils.js
    |-- test-helpers
    |   |-- mockState.js
    |-- test-utils
    |   |-- mocha.opts
    |   |-- utilsSpec.js
```

**Under the hood, this app is using [`nwb`](https://github.com/insin/nwb). A npm package that helps developers to built and setup Javascript projects. Some of the available scripts mentioned above are mapped to `nwb` commands**.

**For more information see the `package.json` file or run the `nwb` command on your terminal**

## Approach and Thinking

I found this case study very challenging. It was great to see implementations of things I had never seen before and to learn from following how the app worked. With the guidelines provided in mind, I estimate that I have spent between 8-10 hours working on the code, with more time used initially reading and understanding the new concepts in the code base.

This app was the first time I have ever worked with the ES6 additions to JavaScript. It was challenging and it took time to learn and appreciate the new additions (e.g. arrow functions, lets and constants). In addition, it was challenging to work with a very different implementation of React than what I have seen and used at my time at CodeClan. Following the construction with the router component, and in particular the validation object and how it was being used was very interesting to see.

After reading over the code base and gaining an overview of how the app functioned, I then progressed through the check list provided, starting with a TDD-approach. Working through and fixing the provided tests proved a great help in understanding the workings of the app. I then moved onto implementing each method as described, altering for any edge cases I found through testing and exploring user stories.



Quality Assurance and Testing
* I recognise that my new methods in utils.js are untested in isolation. Given more time, I would test them separately. As it stands, they are currently tested by calling other functions in which they themselves are tested.

Code Quality
* I recognise that my new functions in utils.js appear inconsistent with regards to variable names between methods. Given more time, I would amend these during refactoring.
* Additionally, I recognise that a large section of my code could always be refactored. Given the time limitations, I chose to get the code operational and relatively tidy, with the knowledge that it would be refactored and tidied up later (e.g. fallbackMethod and areAnyNotesLeft are very similar and not very DRY).
*As above, with more time I would implement comments for my added functions as has been done with the provided functions. Detailing the params and outputs and their types was very useful when reading the code.
*An additional fix to make would be to adjust the rounding on the balance shown to the user on the balance page.

CSS
* Very minimal CSS styling has been added. Given the time limitations, I did not have time remaining to provide much styling. I created and used a stylesheet in order to gain an understanding of how the system was implementing this. I recognise CSS as a personal weakness, and while I always look forward to improving my skills in this area, I realise my strength and focus lies with back-end development.
* I possess an understanding of the concepts and use of CSS (e.g. media queries and viewports, mobile-first development, preprocessing with SASS, etc.). This project has also make me aware of CSS-loaders (such as SASS-loader).
