// TODO: complete the values of the following 3 variables to make the script
// work:
var apiKey = '';
var target = '';
var templateId = '';


var sendgrid = require('sendgrid')(apiKey);

var email = new sendgrid.Email({
    to: target,
    from: target,
    // replaces "<%subject%>" in the template:
    subject: 'Hello, World!',
    // replaces "<%body%>" in the template:
    text: 'An email sent through SendGrid.'
});

// replaces "sent" in the subject+body of the email, we could use something like
// %first_name%
email.addSubstitution('sent', 'received');

// sets the email to use a template
email.addFilter('templates', 'enable', 1);
email.addFilter('templates', 'template_id', templateId);

sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err); }

    console.log(json);
});
