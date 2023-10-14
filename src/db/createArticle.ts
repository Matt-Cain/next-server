import Blog from './modal';

const createArticle = async () => {
  const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });

  await article.save();

  const firstArticle = await Blog.findOne({});
  console.log(firstArticle);
};

export default createArticle;
