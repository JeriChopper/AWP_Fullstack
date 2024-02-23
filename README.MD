### Installation Guidelines:

* Follow `requirements.txt` (commands listed, just copy-paste)

### Technology Choices:

* **Backend / Database:**
  * Node.js Express Backend with MongoDB database.
  * Chosen for ease of execution and familiarity.

### Authorization:

* JsonWebToken, Passport, Cookies.
  * Used JWT for security and familiarity.
  * Stored JWT as a cookie for the user.
  * Passport implemented in some routes.

### Design:

* Most of the design is done with Material UI components.
* Authorization page was made with a `.css` completely.

### Features:

* Responsive Authorization page.
* Clear Routes with Header Component:
  - Home
  - Chat
  - Find
  - Profile
  - Logout {Authorized}
  - Intro, Authorization {Unauthorized}
* Find page displays all registered users; you can like or dislike.
* Profile page allows changing display name, bio, and gender.
* Chat page has a paper with all possible matches; chat with a matched person.
* Logout to log out of the user and terminate JWT.

### HOW-TO-TIMBER:

* Follow installation guidelines (`requirements.txt`).
* After installing dependencies in the right directories, start the program.
  - `npm run dev`
* Backend running on `localhost:4000` as a proxy. Frontend running on `localhost:3000`.
* Index page assists you to Register/Login.
  - First Register, then Login.
  - Backend will give status 200 for successful authorization.
* Once logged in, you can edit your profile, and as you register more users, they appear on the Find page.
* Like or Dislike these users (Like functions/dislike does not). Only one like per person.
* Mutual likes create a match, enabling chat.
* Chat is simple. Press the matched email, start typing, and submit.

* If you want to refresh the page, you'll have to redirect through other pages (e.g., chat->profile->chat).

### Have fun with my software
