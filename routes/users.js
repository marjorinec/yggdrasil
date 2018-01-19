var express = require('express');
var router = express.Router();
var gitlab = require('gitlab')({
  url:   'https://gitlab.globoi.com',
  token: process.env.gitlab_token
});

/* GET users listing. */

router.get('/', function(req, res, next) {
  result = [] 
  gitlab.users.all(function(users) {
      for (var i = 0; i < users.length; i++) {
        if (i == 0) console.log(users[i]) 
          result[i] = users[i]
          // console.log(result[i].id, result[i].name)
          // console.log("#" + users[i].id + ": " + users[i].name + ", path: " + users[i].path + ", default_branch: " + users[i].default_branch + ", private: " + users[i]["private"] + ", owner: " + users[i].owner.name + " (" + users[i].owner.email + "), date: " + users[i].created_at);
      }
      res.json(result)
  });
  // res.json([{"id": "teste", "name": "teste"}]);
});

router.get('/:id/projects', function(req, res, next) {
  result = []
  request.get(GITLAB_URL + "/groups/" + req.params.id + "/projects?private_token=" + process.env.gitlab_token, {}, function(error, response, body) {
    projects = JSON.parse(body)
    for (project in projects) {
      result.push(projects[project])
    }
    res.json(result)
  });
});

module.exports = router;