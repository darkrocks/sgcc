# sgcc
SwiftGift Code Challenge

Run the Application
Prerequisites: you must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.
I have preconfigured the project with a simple development web server. The simplest way to start this server is:
npm start
Now browse to the app at http://localhost:8080/.


Technologies used:
angularjs, bootstrap, less, typescript


Features implemented:
  - on the search page you don't have to click any buttons or make focus out to initiate repository owner search.
  Just start typing and application will automatically fetch the data after little timeout without excess api calls.
  - issue list pagination. it's possible to specify the number of issues per page. Applicaiton never query more data
  from the server than needed for the issues you have to display on a given page, for a given page size.
  - loading indicator and error messages
  - all user actions are being reflected in the url so it's possible to use back/forward browser buttons without full
   page refresh
  - simple issue details page