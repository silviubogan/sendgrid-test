// TODO: Complete the values of the following 4 variables to make the script
// work.
// The SendGrid API Key.
var apiKey = '';
// The first email address used in the From email field and as a recipient.
var target = '';
// The second email address used as a second recipient.
var target2 = ''
// The ID of the used SendGrid email template.
var templateId = '';


// START OF THE SCRIPT:
var sendgrid = require('sendgrid')(apiKey);

// For substitution and section tags, instead of %X% you can use -X-, #X#, :X
// etc. See https://sendgrid.com/docs/API_Reference/SMTP_API/section_tags.html

var email = new sendgrid.Email({
    to: [target, target2],
    from: target,
    // Replaces "<%subject%>" in the template's body and subject:
    subject: 'Hello, World!',
    // Replaces "<%body%>" in the template's body and subject:
    html: 'An email %substitution_verb% through SendGrid to %first_name%.'
    // (If the `text` property is specified instead of `html`, the plain text
    // version of the template is sent.)
});

// Substitutions and sections are the suggested replacement of merge tags when
// migrating from Mandrill to SendGrid. This substitution replaces
// "%first_name%" in the subject and in the body of the email with "A" for the
// first recipient and with "B" for the second recipient. Passing a single
// string instead of an array does not work when there are multiple recipients,
// because the recipients with the exception of the first will receive an empty
// string for that substitution tag. There also exists the `addSubstitutions`
// method which receives an object.
email.addSubstitution('%first_name%', ['A', 'B']);

// This section replaces "%verb%" with "sent" in all the sent emails (in both
// emails). There also exists the `addSections` method which receives an object.
// (Substitutions have one value for each recipient and sections have one value
// for each message, so if you send a message to 3 emails and pass it a section,
// the same section is used in all the 3 sent emails, just like global merge
// vars in Mandrill.)
email.addSection('%verb%', 'sent');

// Section tags must be used through substitution tags, otherwise they do not
// work. As it is said here:
// https://sendgrid.com/docs/API_Reference/SMTP_API/section_tags.html , "It’s
// possible & acceptable to use only Substition tags. However, that method is
// not DRY, and you may come against message size limitations."
email.addSubstitution('%substitution_verb%', ['%verb%', '%verb%']);

// Result:
// The first recipient (A) will receive:
//     An email sent through SendGrid to A.
// The second recipient (B) will receive:
//     An email sent through SendGrid to B.

// Makes the email use a template
email.addFilter('templates', 'enable', 1);
email.addFilter('templates', 'template_id', templateId);

sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err); }

    console.log(json);
});
