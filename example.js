// TODO: Complete the values of the following 3 variables to make the script
// work:
var apiKey = '';
var target = '';
var templateId = '';


var sendgrid = require('sendgrid')(apiKey);

var email = new sendgrid.Email({
    to: target,
    from: target,
    // Replaces "<%subject%>" in the template:
    subject: 'Hello, World!',
    // Replaces "<%body%>" in the template:
    text: 'An email sent through SendGrid.'
});

// This substitution replaces "sent" in the subject and in the body of the email
// with "received". We could use something like "%first_name%" instead of
// "sent". (Substitutions have one value for each recipient and sections have
// one value for each message, so if you send a message to 3 emails and pass it
// a section, the same section is used in all the 3 sent emails.)
email.addSubstitution('sent', 'received');

// Makes the email use a template
email.addFilter('templates', 'enable', 1);
email.addFilter('templates', 'template_id', templateId);

sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err); }

    console.log(json);
});
