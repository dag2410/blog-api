const { Topic } = require("@/models");
const { default: slugify } = require("slugify");

async function generateUniqueSlug(input) {
  const baseSlug = slugify(input, {
    lower: true,
    strict: true,
  });
  let slug = baseSlug;
  let count = 1;
  while (await Topic.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${count++}`;
  }
  return slug;
}

module.exports = generateUniqueSlug;
