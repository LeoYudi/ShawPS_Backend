const githubApi = require('../services/github');

const listUsers = async (req, res) => {
  const { since } = req.query;

  try {
    const response = await githubApi.listUsers(since);

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error });
  }
};

const userDetails = async (req, res) => {
  const { username } = req.params;

  if (!username)
    return res.status(400).json({ msg: 'field "username" is required' });

  try {
    const response = await githubApi.userDetails(username);

    if (response.error)
      return res.status(response.status).json({ error: response.error });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const userRepos = async (req, res) => {
  const { username } = req.params;

  if (!username)
    return res.status(400).json({ msg: 'field "username" is required' });

  try {
    const response = await githubApi.userRepos(username);

    if (response.error)
      return res.status(response.status).json({ error: response.error });

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { listUsers, userDetails, userRepos };