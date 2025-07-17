const { Queue } = require("@/models");

async function retryFailJob() {
  const jobs = await Queue.findAll({
    where: {
      status: "rejected",
    },
  });
  if (!jobs.length) return;
  for (let job of jobs) {
    if (job.retries_count < job.max_retries) {
      await Queue.update(
        {
          status: "pending",
          retries_count: job.retries_count + 1,
        },
        {
          where: {
            id: job.id,
          },
        }
      );
    } else {
      await Queue.update(
        {
          status: "failed",
        },
        {
          where: {
            id: job.id,
          },
        }
      );
    }
  }
}

module.exports = retryFailJob;
