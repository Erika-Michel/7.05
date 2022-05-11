Feature: Book a ticket
 
  Scenario: Should check if available time is shown
 Given user is on the page "http://qamid.tmweb.ru/client/index.php"
 When user chooses day and movie
 Then user sees if available time is shown

   Scenario: Should book a ticket if available
 Given user is on the page "http://qamid.tmweb.ru/client/index.php"
 When user chooses day, movie and chair
 Then user books and receives ticket

    Scenario: Should not book a ticket if already booked
 Given user is on the page "http://qamid.tmweb.ru/client/index.php"
 When user books movie and tries to book it again
 Then user sees that chair is taken

 

