
###Installation guidelines:

    *Follow requirements.txt (commands listed just copy-paste)


###Technology Choices:
*Backend / Database:
*I wanted to make nodejs express Backend with a Mongodb database. The reason being that I found this the best way to execute to project and I was also familiar with these two.

###Authorization:
*JsonWebToken, Passport, Cookies; I used jwt as that is the method I was most familiar with and it is also safer than localstorage or the others. Stored jwt as a cookie for the user. Passport implemented in some of the routes.

###Design:
*Most of the design is done with Material UI components but Authorization page was made with a .css completely.


###Features : 
    *Responsive Authorization page
    *Clear Routes with Header Component [Home, Chat, Find, Profile, Logout {Authorized}] [Intro, Authorization {Unauthorized}]
    * Find page will show all of the registered users, you can like or dislike
    *Profile page is so that you can change your display name, bio and gender which will appear in the Find page. 
    * Chat page has a paper with all of your possible matches. Chat with a matched person
    * Logout to log out of the user and terminate jwt.


###HOW-TO-TIMBER:

*Follow installation guidelines (requirements.txt)
*After all of the dependencies are installed in the right directories you can start the program.
*npm run dev
*Backend running on localhost:4000 as a proxy. Frontend running on localhost:3000.
*Index page assists you to Register/Login. First Register than Login. Backend will give status 200 for succesful authorization.
*Once you are logged in, you can edit your profile for example. Timber! is based on interaction so you will need to register/login more accounts with different client. 
*As you register users to page you start to see them on the Find page.
*You can Like or Dislike these users (Like functions/ dislike does not). Only one like per one person.
*If you have mutual likes with two accounts you will have a match. This opens the option to use chat.
*Chat is simple. Press the matched email, start typing and submit. 

*If you want to refresh the page you will have to redirect through other pages (f.e chat->profile->chat=)

###Have fun with my software
