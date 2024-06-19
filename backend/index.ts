import bootStrap from "./src/bootStrap";

// import './utils/email/email'; // for email setup
/**
 * bootStrap the app
 */


bootStrap().then(({  killServer }) => {
    process.on('SIGINT', () => {
        killServer()
    })
})

