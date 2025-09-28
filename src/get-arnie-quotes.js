const { httpGet } = require("./mock-http-interface");

const SUCCESS_RESULT_KEY = "Arnie Quote";
const FAILURE_RESULT_KEY = "FAILURE";

const SUCCESS_STATUS_CODE = 200;

const DEFAULT_ERROR_MESSAGE = "Failed to get Arine Quote";

const getArnieQuote = async (url) => {
  try {
    const { status, body } = await httpGet(url);

    const { message } = JSON.parse(body);
    const resultKey =
      status === SUCCESS_STATUS_CODE ? SUCCESS_RESULT_KEY : FAILURE_RESULT_KEY;

    return { [resultKey]: message };
  } catch (error) {
    console.error(
      `Unexpected error when getting Arine Quote from ${url}`,
      error
    );
    return { [FAILURE_RESULT_KEY]: DEFAULT_ERROR_MESSAGE };
  }
};

const getArnieQuotes = async (urls) => {
  const arnieQuotePromises = urls.map(getArnieQuote);
  return Promise.all(arnieQuotePromises);
};

module.exports = {
  getArnieQuotes,
};
