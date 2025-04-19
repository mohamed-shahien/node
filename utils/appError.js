class AppError extends Error {
        constructor() {
                super();
        }
        ccreate(message, statuseCode, statusetext) {
                this.message = message;
                this.statusCode = statuseCode;
                this.statusetext = statusetext;
                return this;
        }
}

module.exports = new AppError();