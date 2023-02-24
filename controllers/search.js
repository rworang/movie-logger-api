export const multiSearch = async (req, res, next) => {
  const currPage = req.query.page ? req.query.page : 1;
  const adult = false;
  const language = "en-US";
  const url = `${process.env.TMDB_URL}/search/multi?api_key=${process.env.TMDB_KEY}&language=${language}&query=${req.query.q}&page=${currPage}&include_adult=${adult}`;

  try {
    const page = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    res.status(200).json(page);
  } catch (err) {
    next(err);
  }
};
