const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      bsp {
        songs {
          title
          slug
        }
        contributors {
          contributor_id
          contributor_slug
        }
        languages {
          language_id
          language_code
        }
        tags {
          tag_id
          tag_slug
        }
      }
    }
  `);

  result.data.bsp.songs.forEach((song) => {
    actions.createPage({
      path: `/${song.slug}`,
      component: path.resolve(`./src/components/SongPage.js`),
      context: {
        songSlug: song.slug,
      },
    });
  });

  result.data.bsp.contributors.forEach((contributor) => {
    actions.createPage({
      path: `/contributor/${contributor.contributor_slug}`,
      component: path.resolve(`./src/components/ContributorPage.js`),
      context: {
        contributorId: contributor.contributor_id,
      },
    });
  });

  result.data.bsp.languages.forEach((language) => {
    actions.createPage({
      path: `/language/${language.language_code}`,
      component: path.resolve(`./src/components/LanguagePage.js`),
      context: {
        languageId: language.language_id,
      },
    });
  });

  result.data.bsp.tags.forEach((tag) => {
    actions.createPage({
      path: `/tag/${tag.tag_slug}`,
      component: path.resolve(`./src/components/TagPage.js`),
      context: {
        tagId: tag.tag_id,
      },
    });
  });

  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`);

  const mardownPages = await graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  mardownPages.data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });
};
