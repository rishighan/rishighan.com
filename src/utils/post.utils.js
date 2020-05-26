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

/**
 * Gets the Masthead image URL from a collection of posts.
 * @param {Array} posts - An array of post objects.
 * @return {String} - The Masthead image URL
 */
export const getMastheadImageUrl = (posts) => {
  let mastheadPost = extractPostByTagName(posts, "Masthead");
  return extractHeroImageFromPost(mastheadPost[0]);
};

/**
 * Matches a string with the provided regex.
 * @param {string} sourceText - The string to match.
 * @param {RegExp} pattern - A regular expression.
 */
export const matchPattern = (sourceText, pattern) => {
  return sourceText.match(pattern);
};

/**
 * Finds out if a path matches /admin OR /login.
 * @return {Object} - Boolean values indicating if path matches /admin or /login.
 */
export const isProtectedPath = path => {
  return {
    admin: matchPattern(path, /\/admin(.)*/gm) !== null,
    login: matchPattern(path, /\/login\/?/gm) !== null,
  };
};
