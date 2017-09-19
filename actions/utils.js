const popBoard = [
  {
    path: "lists",
    select: "title description slug cards -_id",
    populate: {
      path: "cards",
      model: "Card",
      select: "title description slug members -_id",
      populate: { path: "members", model: "User", select: "username -_id" }
    }
  },
  { path: "members", model: "User", select: "username -_id" }
];

const projBoard = { title: 1, slug: 1, lists: 1, members: 1, _id: 0 };

const popList = {
  path: "cards",
  populate: [
    {
      path: "members",
      model: "User",
      select: "username -_id"
    },
    {
      path: "activities",
      model: "Activity",
      select: "-_id"
    }
  ]
};

const projList = { title: 1, description: 1, slug: 1, cards: 1, _id: 0 };

module.exports = { popBoard, projBoard, popList, projList };
