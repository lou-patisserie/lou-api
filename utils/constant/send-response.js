export function sendResponse(res, result) {
  return res.status(result.status || 500).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
}
