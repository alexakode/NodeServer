const logEvents = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`[${time}] ${method} ${url}`);
    next();
}
const logger = (req, res, next) => {
    logEvents(`${req.method}, ${req.header.origin}, ${req.url}`, "reqLog.txt");
        if(process.env.NODE_ENV === 'development')
        {
            console.log(`${req.method} ${req.path}`);
        }
        next();
}
module.exports = logEvents;