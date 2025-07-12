
StackIt - Bootstrap Based Q&A Frontend (React + Vite)
------------------------------------------------------

This frontend uses Bootstrap 5 and demonstrates a minimal Q&A platform like Stack Overflow.

Structure Summary:

- components/       → UI components like Header, Cards, Editor, Bell icon
- pages/            → Page-level views: Login, Register, Home, etc.
- services/         → Axios logic for APIs (Auth, Questions, Notifications)
- hooks/            → Custom React hooks (Auth, Fetch, Socket)
- context/          → Global Contexts for Auth & Notification
- App.jsx           → Routing and Layout
- index.css         → Bootstrap import
- main.jsx          → ReactDOM entry point

Sample Data: `Home.jsx` maps a sample list of questions
Demo Text: Every form/page includes helper placeholders & Bootstrap layout

Bootstrap CDN is used in index.html or installed via npm.
