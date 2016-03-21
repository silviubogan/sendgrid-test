# SendGrid evaluation and API test
The free plan supports webhooks, up to 12000 transactional emails per month, up
to 2000 free contacts for marketing emails and has a nice NodeJS API with a good
documentation (the documentation is not very good but looks sufficient for what
we want to do with it).

[Here](https://sendgrid.com/docs/User_Guide/Transactional_Templates/create_edit.html)
it is said that: `There is currently a limit of 300 templates and 300 versions
that may be created per account.`

To run `example.js` first run `npm install sendgrid` in its directory and
complete the values of the first three variables declared at the beginning of
the script.

Other relevant links: [NodeJS API
docs](https://github.com/sendgrid/sendgrid-nodejs), [How to migrate from
Mandrill](https://sendgrid.com/blog/how-to-migrate-from-mandrill-to-sendgrid/),
[API docs](https://sendgrid.com/docs/API_Reference/index.html).
