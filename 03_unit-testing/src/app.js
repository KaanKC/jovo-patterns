const { App } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
const { FileDb } = require('jovo-db-filedb');
const app = new App();

app.use(
    new GoogleAssistant(),
    new Alexa(),
    new FileDb(),
);


app.setHandler({
    LAUNCH() {
        this.toIntent('HelloWorldIntent');
    },

    HelloWorldIntent() {
        this.followUpState('IntroductionState')
            .ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },

    IntroductionState: {
        MyNameIsIntent() {

            this.toStatelessIntent('MyNameIsIntent');
        },

        // // Test fails if this is commented out
        // Unhandled() {
        //     this.ask('What\'s your name?');
        // },
    },

    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },

});
module.exports.app = app;
