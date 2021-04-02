import { MIN_SAFE_INTEGER } from "core-js/library/es6/number";

FOR DEVELOPMENT ONLY

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
//in prod we want to stop users from trying to send requests in odd ways to erase other peoples stuff
----
//you can check in 94 the beginning
//mine 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 5, 1);
    }
  }
}


----
VIDEO 160
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2020, 11, 6);
    }
  }
} 

IF YOU NEED TO EDIT IMAGES GO TO STORAGE.rules