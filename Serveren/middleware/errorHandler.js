const {logEvents} = require('./logEvents');
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    if(process.env.NODE_ENV === 'development') {
        res.status(500).json({ message: err.message, stack: err.stack });
    } else {
        res.status(500).json({ message: 'Server Error' });
    }
}
// only tell users what they need, keep the rest for the logs
module.exports = errorHandler;