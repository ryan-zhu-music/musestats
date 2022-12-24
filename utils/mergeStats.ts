export const mergeStats = (stats: any) => {
  const mergedStats = {
    user: stats[stats.length - 1].user,
    counters: stats[stats.length - 1].counters,
    scores: {
      views: 0,
      comments: 0,
      duration: 0,
      pages: 0,
      favourites: 0,
      votes: 0,
      original: 0,
      public_domain: 0,
    },
    average: {
      views: 0,
      comments: 0,
      duration: 0,
      pages: 0,
      favourites: 0,
      votes: 0,
      rating: 0,
    },
  };

  stats.forEach((stat: any) => {
    mergedStats.scores.views += stat.scores.views;
    mergedStats.scores.comments += stat.scores.comments;
    mergedStats.scores.duration += stat.scores.duration;
    mergedStats.scores.pages += stat.scores.pages;
    mergedStats.scores.favourites += stat.scores.favourites;
    mergedStats.scores.votes += stat.scores.votes;
    mergedStats.average.rating += stat.scores.rating;
    mergedStats.scores.original += stat.scores.original;
    mergedStats.scores.public_domain += stat.scores.public_domain;
  });

  const totalScores = mergedStats.counters.scores;

  mergedStats.average.views = Math.round(
    mergedStats.scores.views / totalScores
  );
  mergedStats.average.comments = Math.round(
    mergedStats.scores.comments / totalScores
  );
  mergedStats.average.duration = Math.round(
    mergedStats.scores.duration / totalScores
  );
  mergedStats.average.pages = Math.round(
    mergedStats.scores.pages / totalScores
  );
  mergedStats.average.favourites = Math.round(
    mergedStats.scores.favourites / totalScores
  );
  mergedStats.average.votes = Math.round(
    mergedStats.scores.votes / totalScores
  );
  mergedStats.average.rating = Math.round(
    mergedStats.average.rating / totalScores
  );

  return mergedStats;
};
