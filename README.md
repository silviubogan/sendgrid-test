# SendGrid evaluation and API test for jillix
The free plan supports up to 12000 transactional emails per month, webhooks, up
to 2000 free contacts for marketing emails and has a nice NodeJS API with [a
good documentation](https://github.com/sendgrid/sendgrid-nodejs) ([the
documentation](https://github.com/sendgrid/sendgrid-nodejs) is not very good but
it looks sufficient for what we want to do with it and it is completed by [the
other API docs](https://sendgrid.com/docs/API_Reference/index.html)).

[Here](https://sendgrid.com/docs/User_Guide/Transactional_Templates/create_edit.html)
it is said that: `There is currently a limit of 300 templates and 300 versions
that may be created per account.`

To run `example.js` first run `npm install` in its directory and complete the
values of the first 4 variables declared at the beginning of the script.

Other relevant links: [NodeJS API
docs](https://github.com/sendgrid/sendgrid-nodejs), [How to migrate from
Mandrill](https://sendgrid.com/blog/how-to-migrate-from-mandrill-to-sendgrid/),
[API docs](https://sendgrid.com/docs/API_Reference/index.html).
