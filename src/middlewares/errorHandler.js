function errorHandler(err, req, res, next) {
  // headersSent 를 확인하는 이유가 뭐지?...
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);

  /*
    종열 : res.render 메서는 html문서 빌드해서 보내줄때 
    사용하는 메서드라서 사용하지 않는것이 좋을듯 합니다
  */
  res.render("error", { error: err });
}

export { errorHandler };
