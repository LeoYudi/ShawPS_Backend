const { api } = require('../utils/fetch');

const listUsers = async since => {
  try {
    const { data } = await api('GET', `/users?since=${since}`);
    const next = data[data.length - 1].id;

    return { users: data, next, prev: since ? since - 1 : 0 };
  } catch (error) {
    throw error;
  }
};

const userDetails = async username => {
  try {
    const { status, data } = await api('GET', `/users/${username}`);

    if (status !== 200)
      return { error: data.message, status };

    return { user: data };
  } catch (error) {
    throw error;
  }
};

const userRepos = async username => {
  try {
    const { status, data } = await api('GET', `/users/${username}/repos`);

    if (status !== 200)
      return { error: data.message, status };

    return { repos: data };
  } catch (error) {
    throw error;
  }
}

module.exports = { listUsers, userDetails, userRepos };