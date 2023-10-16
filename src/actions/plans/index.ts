import Plan from "@/models/plan";

export const createPlan = async (_parent, params, context) => {
  const { startDate, endDate } = params;
  const { user } = context;
  console.log(Plan, startDate, endDate, user);

  const plan = new Plan({
    startDate,
    endDate,
    user: user.id
  });

  await plan.save();

  return plan;
};

export const getPlans = async (_parent, params, context) => {
  const { user } = context;
  const { startDate, endDate } = params;

  // start and end date are for the whole month where a plan's start and end date are within one week
  // use the start and end date to find all plans that are within the month
  // use the user id to only include plans for that user

  const plans = await Plan.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
    user: user.id
  });

  console.log(plans);
  return plans;
}

// export const findUserByEmail = async (emailParam) => {
//   const user = await User.findOne({ email: emailParam });
//   if (!user) return null;

//   const { _id: id, email, hash } = user;

//   return { id, email, hash };
// }

// export const findUserById = async (idParam) => {
//   const user = await User.findById(idParam);
//   if (!user) return null;

//   const { _id: id, email, hash } = user;

//   return { id, email, hash };
// }
