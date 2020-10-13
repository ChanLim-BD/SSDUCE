var list = function(req, res, next) {
    console.log("===== Router Call =====");
    console.log("Router : list");
    var database = app.get('database');
    var context = { member: req.user };

    database.BoardModel.list({}, function(err, results) {
        if (err) {
            context['error'] = err;
        }
        else if (results) {
            context['posts'] = results;
        } else {
            context['posts'] = null;
        }

        return res.render('./board/list.ejs', context);
    })

    // return res.render('./board/list.ejs', {member: req.user});
}

var write = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : write");
    // Login된 User만 글작성 가능
    if (req.isAuthenticated()){
        return res.render('./board/write.ejs', {member: req.user});
    } else {
        return res.redirect('/member/signin');
    }
}

var write_post = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : write_post");

    var database = app.get('database');

    // Login된 User만 글작성 가능
    if (req.isAuthenticated()){
        var post = new database.BoardModel({'title': req.body.title, 'contents': req.body.contents, 'writer': req.user._id});
        var context = { member: req.user };
        post.save(function(err) {
            if (err) {
                context['error'] = err;
                // Error시 보여지는 Page 제작
            }

            return res.redirect('/board');
        });
    } else {
        return res.redirect('/member/signin');
    }
}

var show = function(req, res) {
    console.log("===== Router Call =====");
    console.log("Router : show");
    res.render('./board/show.ejs', {member: req.user});
}

var route_func = {
    list: list,
    write: write,
    write_post: write_post,
    show: show
}

module.exports = route_func;