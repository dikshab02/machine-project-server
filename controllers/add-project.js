const PROJECT_CONTROLLER = require("mongoose").model("ProjectCollection");

function checkDateOverlap(stDate, edDate) {
  return {
    $or: [
      {
        $and: [{ startDate: { $lte: stDate } }, { endDate: { $gte: stDate } }],
      },
      {
        $and: [
          { startDate: { $gte: stDate } },
          { startDate: { $lte: edDate } },
        ],
      },
    ],
  };
}

module.exports = {
  addProject: (req, res) => {
    let project = JSON.parse(JSON.stringify(req.body));
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    const checkQry = checkDateOverlap(project.startDate, project.endDate);
    try {
      PROJECT_CONTROLLER.find(checkQry).then((op) => {
        if (op.length > 0) {
          return res.send({
            isError: true,
            message: "Project date overlaps with another projects",
            data: null,
          });
        }
        PROJECT_CONTROLLER.create(project)
          .then((newProjectObj) => {
            res.send({
              isError: false,
              data: newProjectObj,
            });
          })
          .catch((err) => {
            res.status(400).send({
              isError: true,
              data: err,
            });
          });
      });
    } catch (error) {
      res.status(500).send({
        isError: true,
        message: "Internal server error",
        data: error,
      });
    }
  },
  getProjectByDateRange: (req, res) => {
    let project = JSON.parse(JSON.stringify(req.body));
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    const checkQry = checkDateOverlap(project.startDate, project.endDate);
    try {
      PROJECT_CONTROLLER.find(checkQry)
        .populate('allocateMachine')
        .then((projects) => {
          res.send({
            isError: false,
            message: "Successfully getting projects",
            data: projects,
          });
        })
        .catch((error) => {
          res.send({
            isError: true,
            message: "error",
            data: error,
          });
        });
    } catch (error) {
      res.send({
        isError: true,
        message: "",
        data: error,
      });
    }
  },
};
