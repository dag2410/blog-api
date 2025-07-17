require("module-alias");
const cron = require("node-cron");

const activeJob = {};

function scheduleJob(name, cronTime, handler) {
  if (activeJob[name]) {
    return console.log(`Task ${name} exists, cancelled`);
  }
  const task = cron.schedule(cronTime, async () => {
    try {
      await handler();
    } catch (error) {
      console.log(error);
    }
  });
  activeJob[name] = task;
}

module.exports = scheduleJob;
