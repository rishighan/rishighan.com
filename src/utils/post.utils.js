export const extractPostByTagName = (collection, tagName) => {
  let temp = _.chain(collection)
    .map((posts) => {
      return _.map(posts.tags, (tag) => {
        if (tag.value === tagName) {
          return posts;
        }
      });
    })
    .each((posts) => {
      let targetedPost = _.each(posts, (post) => {
        if (!_.isUndefined(post)) {
          return targetedPost;
        }
      });
      return _.pull(targetedPost, undefined);
    })
    .value();
  return _.flatten(temp);
};

export const extractHeroImageFromPost = (post) => {
  if (!_.isUndefined(post)) {
    let heroImage = [];
    _.each(post.attachment, (attachment) =>
      attachment.isHero
        ? heroImage.push({ url: attachment.url, title: post.title })
        : null
    );
    return heroImage[0];
  }
};
