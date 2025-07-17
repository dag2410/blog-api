require("module-alias/register");

const scheduleJob = require("@/utils/scheduler");
const retryFailJob = require("./retryFailJob");

scheduleJob("retryFailJob", "*/5 * * * * *", retryFailJob);
