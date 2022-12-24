export const mergeStats = (stats: any) => {
  console.log(stats);
  const mergedStats = {
    user: stats[stats.length - 1].user,
    counters: stats[stats.length - 1].counters,
    scores: {
      plays: 0,
      comments: 0,
      duration: 0,
      pages: 0,
      favourites: 0,
      votes: 0,
      rating: 0,
      original: 0,
      public_domain: 0,
    },
  };

  stats.forEach((stat: any) => {
    mergedStats.scores.plays += stat.scores.plays;
    mergedStats.scores.comments += stat.scores.comments;
    mergedStats.scores.duration += stat.scores.duration;
    mergedStats.scores.pages += stat.scores.pages;
    mergedStats.scores.favourites += stat.scores.favourites;
    mergedStats.scores.votes += stat.scores.votes;
    mergedStats.scores.rating += stat.scores.rating;
    mergedStats.scores.original += stat.scores.original;
    mergedStats.scores.public_domain += stat.scores.public_domain;
  });

  mergedStats.scores.rating /= mergedStats.counters.scores;

  return mergedStats;
};
