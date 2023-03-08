class NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends NodeError {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ServerError extends NodeError {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  NodeError,
  ValidationError,
  ServerError
};
