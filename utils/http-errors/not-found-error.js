import createError from "http-errors";

function HttpErrorsNotFound(req, res, next) {
  next(createError(404));
}

export default HttpErrorsNotFound;
