export const parseStatistics = (data: string) => {
  let raw = data.split('data-content="')[1];
  raw = raw.split("></div>")[0];
  raw = raw.trim();
  raw = raw.slice(0, -1);
  raw = raw.replaceAll("&quot;", '"');

  const response = JSON.parse(raw);
  const stats = response.store.page.data;

  const statistics = {
    user: {
      id: stats.user.id,
      username: stats.user.name,
      first_name: stats.profile.first_name,
      last_name: stats.profile.last_name,
      gender: stats.profile.gender,
      country_code: stats.profile.country_code,
      url: stats.user.url,
      avatar: stats.user.image,
      cover: stats.user.cover_url,
      is_pro: stats.user.is_pro,
      is_moderator: stats.user.is_moderator,
      is_staff: stats.user.is_staff,
      date_created: stats.user.date_created,
      birthday: stats.profile.birthday,
    },
    counters: {
      followers: stats.counters.followers.count,
      following: stats.counters.following.count,
      sets: stats.counters.sets.count,
      scores: stats.counters.scores.count,
      groups: stats.groups.length,
    },
    scores: scoreParser(stats.scores),
  };

  return statistics;
};

const scoreParser = (scores: Array<any>) => {
  const scoreStats = {
    views: 0,
    comments: 0,
    duration: 0,
    pages: 0,
    favourites: 0,
    votes: 0,
    rating: 0,
    original: 0,
    public_domain: 0,
  };

  scores.forEach((score) => {
    scoreStats.views += score.hits;
    scoreStats.comments += score.comments_count;
    scoreStats.duration += score.length;
    scoreStats.pages += score.pages_count;
    scoreStats.favourites += score.favorite_count;
    scoreStats.votes += score.rating.count;
    scoreStats.rating += score.rating.rating;
    scoreStats.original += score.is_origin ? 1 : 0;
    scoreStats.public_domain += score.is_public_domain;
  });

  return scoreStats;
};
