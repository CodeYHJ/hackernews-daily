const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  // authStrategy: createAppAuth,
  auth: process.env.TOKEN,
  request: {
    fetch: fetch,
  },
});

const open = async ({owner, repo, title, body}) => {
  try {    
    console.log('opening issue');
    const res = await octokit.request("POST /repos/{owner}/{repo}/issues",{
      owner,
      repo,
      title,
      body,
    });
    console.log('opened');
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const lock = async ({owner, repo, issueNumber}) => {
  console.log('locking issue');
  await octokit.request(
    "PUT /repos/{owner}/{repo}/issues/{issue_number}/lock",{
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
    lock_reason: 'resolved'
  });
  console.log('locked');
}

module.exports = {
  open,
  lock,
}

// lock({
//   owner: 'headllines',
//   repo: 'hackernews-daily',
//   issueNumber: 39,
// });
