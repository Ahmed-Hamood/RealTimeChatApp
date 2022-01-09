const moment = require("moment");

// format message that return username and msgText
// and return a time with hour:minutes AM/PM format
function formatMessage(username, msgText) {
  return {
    username,
    msgText,
    time: moment().format('h:mm a') 
  }
}

module.exports = formatMessage
