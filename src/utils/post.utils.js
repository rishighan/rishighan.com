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

export const extractHeroImageFromPost = post => {
    if(!_.isUndefined(post[0])) {
        let heroImageUrl = [];
        _.each(post[0].attachment, attachment => attachment.isHero ? heroImageUrl.push(attachment.url) : null);
        return heroImageUrl[0];
    }
};
