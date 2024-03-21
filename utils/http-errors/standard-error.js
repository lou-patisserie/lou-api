class StandardError extends Error {
  constructor({ success, message, status }) {
    super(message);
    this.success = success;
    this.status = status;
  }
}

export default StandardError;
