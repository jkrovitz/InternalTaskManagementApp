export default function asyncWrapper(callback) { //When we have async code in our controllers, which is like 99% of the time, if we have any error that is thrown there, then right now that error is not caught by the errors middleware unless we have a way to catch the error. This is not going to be a problem in Express 5. In express 5, this will be implemented natively, so you don't have to do anything if you are in the future and you are already using express 5.

    return function(req, res, next) {
        callback(req, res, next).catch(next) // This will make sure that we catch any error that is thrown by an async function 
    }
}