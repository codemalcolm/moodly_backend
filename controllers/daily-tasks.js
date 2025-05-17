const createDailyTask = async (req, res) => {
  res.send("OK");
};
const updateDailyTask = async (req, res) => {
  const { dailyTaskId } = req.params;
  res.send(dailyTaskId);
};
const deleteDailyTask = async (req, res) => {
  const { dailyTaskId } = req.params;
  res.send(dailyTaskId);
};

module.exports = {
  createDailyTask,
  updateDailyTask,
  deleteDailyTask,
};
