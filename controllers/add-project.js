const PROJECT_CONTROLLER = require("mongoose").model("ProjectCollection");

module.exports = {
  addProject: (req, res) => {
    let project = JSON.parse(JSON.stringify(req.body));
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    try {
      const checkQry = {
        $or: [
          {
            $and: [
              { startDate: { $lte: project.startDate } },
              { endDate: { $gte: project.startDate } },
            ],
          },
          {
            $and: [
              { startDate: { $gte: project.startDate } },
              { startDate: { $lte: project.endDate } },
            ],
          },
        ],
      };
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
            res.status(500).send({
              isError: true,
              data: err,
            });
          });
      });
    } catch (error) {}
  },
};
