This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started, Instructions to set up and run the project locally.


first install the dependencies:

```bash
npm install
# or
yarn install

and, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## A brief explanation of the architectural decisions.

- The project is built using Next.js, a React framework that allows for server-side rendering and static site generation.
- The project uses Tailwind CSS for styling and antd for UI components.
- The project uses Redux for state management.
- The project uses Axios for API requests.
- The project uses middleware protected routes if the user is not authenticated, and RBAC for role-based access control (admin, manager, viewer).
- The project uses nodemailer for sending emails notifications.
- The project uses the React Hook Form and zod for form validation.
- The project uses the react-hot-toast library for notifications.
- The project uses the chart.js library for data visualization.
- The project responsive design is implemented using Tailwind CSS.
- The project uses useRouter for routing.
- The project uses mock api data for testing.


## Any additional notes or known issues.
- The project uses a mock api for testing endpoints product, and order
- For API authentication, and user . use sample backend API (i made it) 
- In the endpoints, the product u can add, delete, update, and get all products, but in add product u can't delete new product after creating it. because rule the backend API is a mock API.
- In the user endpoints, you can add, delete, update, as well as login with the user, the password credentials is default (admin, manager, viewer) and the password is 12345678.
- In the order endpoints, you can update status order, and send email notification to the user. using nodemailer.


## The project is deployed on Vercel, and you can access it using the following link:
[https://homework-test-minardi.vercel.app/](https://homework-test-minardi.vercel.app/)


## Credentials for login:
- Admin: admin@gmail.com, 12345678
- Manager: manager@gmail.com, 12345678
- Viewer: viewer1@gmail.com, 12345678 (you can add new user with role viewer)
- protected routes: admin, manager, viewer with role-based access control (RBAC)
