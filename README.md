# second-screen

Second screen prototype for Hackday Q1/19

## Dependencies

Install Meteor with the command: `curl https://install.meteor.com/ | sh`

## Run

Run meteor by running command `meteor` in the folder

## Application navigation

All the data is canned at the moment and was used just as an example.

Presuming that you started on `localhost:3000` (or whatever you declared if you didnt use the default):

* go to `localhost:3000/add` to initialise your reading list with the main document, click on the document to add it to the reading list
* you will find the main (desktop) view for the reader at the root, click on the document in the reading list to show it on the page.
* Open the other pages in another session (tab, window, another device accessable to your IP) to pull the tab out of the main window and show in second screen, close to add back again
  * citation window at `localhost:3000/cit`
  * reading list window at `localhost:3000/reading`
