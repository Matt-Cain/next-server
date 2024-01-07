import { Types } from 'mongoose';
import Course from '../models/course';
import Item from '../models/item';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

export const createCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { type, name, recipe, ingredients } = params;

  const createdItems = (await Item.create(ingredients)) as unknown as any[];

  const ingredientIds = createdItems?.map(({ _id: id }) => id);

  const course = new Course({
    type,
    name,
    recipe,
    ingredients: ingredientIds,
    user: user.id,
  });

  await course.save();

  return course;
};

export const getCourses = async (
  _parent: any,
  _params: any,
  context: Context,
) => {
  const { user } = context;

  const courses = await Course.find({ user: user.id }).populate('ingredients');

  return courses;
};

export const getCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id } = params;

  const course = await Course.findOne({ _id: id, user: user.id }).populate(
    'ingredients',
  );

  return course;
};

export const updateCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id, ingredients, ...rest } = params;

  const course = await Course.findOne({ _id: id, user: user.id }).populate(
    'ingredients',
  );

  const previousIngredientIds = course?.ingredients.map(
    ({ _id: ingredientId }: { _id: Types.ObjectId }) => ingredientId.toString(),
  );

  const ingredientsMap = ingredients?.reduce(
    (acc: any, ingredient: any) => {
      if (ingredient.id) {
        acc.ingredients.push(ingredient.id);
      } else {
        acc.newIngredients.push(ingredient);
      }
      return acc;
    },
    { ingredients: [], newIngredients: [] },
  );

  const createdItems = (await Item.create(
    ingredientsMap.newIngredients,
  )) as unknown as any[];

  const newIngredientIds = createdItems?.map(
    ({ _id: ingredientId }) => ingredientId,
  );

  const ingredientsToDelete = previousIngredientIds?.filter(
    (previousIngredientId: string) =>
      !ingredientsMap.ingredients.includes(previousIngredientId),
  );

  await Item.deleteMany({ _id: { $in: ingredientsToDelete } });

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: id, user: user.id },
    {
      ...rest,
      ingredients: [...ingredientsMap.ingredients, ...newIngredientIds],
    },
    { new: true },
  ).populate('ingredients');

  return updatedCourse;
};

export const deleteCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id } = params;

  const deletedCourse = await Course.findOneAndDelete({
    _id: id,
    user: user.id,
  });
  console.log({ deletedCourse });

  return Boolean(deletedCourse);
};
