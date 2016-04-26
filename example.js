// TODO: Complete the values of the following 4 variables to make the script
// work.
// The SendGrid API Key.
var apiKey = '';
// The first email address used in the From email field and as a recipient.
var target = '';
// The second email address used as a second recipient.
var target2 = '';
// The ID of the used SendGrid email template.
var templateId = '';


// START OF THE SCRIPT:
var sendgrid = require('sendgrid')(apiKey);

// For substitution and section tags, instead of %X% you can use -X-, #X#, :X
// etc. See https://sendgrid.com/docs/API_Reference/SMTP_API/section_tags.html

// The `to`, `from` and `replyto` properties of the object passed as an argument
// to the email constructor below can be simple email addresses or strings in
// the following format: `"Example Name" <example@example.com>` where Example
// Name is the name of the contact represented by the email address inside the
// angle brackets.
var email = new sendgrid.Email({
    to: [target, target2],
    from: target,
    // Must be at least a string with a single space character (must not be an
    // empty string, otherwise it gives an error), replaces "<%subject%>" in the
    // template's body and subject:
    subject: 'Hello, World!',
    // Must be at least strings with a single space character (must not be empty
    // strings, otherwise it gives an error), replaces "<%body%>" in the
    // template's body and subject (If only the `text` property is specified
    // instead of `html`, the plain text version of the template is always used
    // and sent. The best is to specify both the `text` property and the `html`
    // property.):
    text: 'An email %substitution_verb% through SendGrid to %first_name%.',
    html: 'An email %substitution_verb% through SendGrid to <em>%first_name%</em>.',
    // The email address to which the recipients will respond if they use the
    // Reply button in their email clients:
    replyto: target
});

// Substitutions and sections are the suggested replacement of merge tags when
// migrating from Mandrill to SendGrid. This substitution replaces
// "%first_name%" in the subject and in the body of the email with "A" for the
// first recipient and with "B" for the second recipient. Passing a single
// string instead of an array does not work when there are multiple recipients,
// because the recipients with the exception of the first will receive an empty
// string for that substitution tag. There also exists the `setSubstitutions`
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

// Makes the email use a template. Maybe we could use
// https://sendgrid.com/docs/API_Reference/Web_API_v3/Transactional_Templates/templates.html
// , the GET request to retrieve all templates, to obtain a template ID from a
// template name to make it easier for us to work with templates.
email.addFilter('templates', 'enable', 1);
email.addFilter('templates', 'template_id', templateId);

sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err); }

    console.log(json);
});
