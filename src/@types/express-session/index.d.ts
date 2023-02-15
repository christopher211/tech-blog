// use declaration merging to add the session property to the Request interface
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user_id: number;
    username: string;
    loggedIn: boolean;
  }
}
