function errorHandler(err, req, res, _next) {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
}

module.exports = errorHandler;
