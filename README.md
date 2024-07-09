# Todo app

### Description

This is a simple todo app with two screens:

- List: Displays all available todos
- Details: Displays and let's the user update or delete one single todo

The current project's implementation present on the `main` branch only contains todo's state that is local to each screen.

There is a `backend.ts` available that simulates an interaction with a real world API:

- Sometimes requests may fail
- Responses take a variable amount of time to be served
- You should not update this file, it is simply to be used as a replacement to a real backend

### Expectations

We expect you to treat these steps as a real world production app development that is meant to:

- Make the state reusable across the app, so that when a todo is updated in the details screen, the list screen is updated as well
- Maintain snappy app interactions (for reference, [users shouldn't ever wait for >100ms](https://blog.superhuman.com/superhuman-is-built-for-speed/))
- Keep same data consistent and trustworthy across the whole app
- Write some key tests to ensure the app is working as expected. No need to chase high coverage just test what you think is important
- Code is reliable and does not fail in edge cases
- Make the result code easy to understand and maintain
- Overal looks is not the focus of this test, but we do expect you to show a good sense of what makes a good user experience
- App can be scaled to 5-10 engineers contributing simultaneously

### Steps

Please create a branch from `main` and do implement the app, according to expectations.
When you finish, please open a PR back to `main` and let us know you're done.
You can add in the description of the PR any comments you think are relevant: the rationale behind your decisions and trade-offs, clarifications, what other steps you would add to improve etc.

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

More information about the nextjs details can be found in the [README.nextjs.md](README.nextjs.md) file.
