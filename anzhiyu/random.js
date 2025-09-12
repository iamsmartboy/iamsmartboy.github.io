var posts=["posts/16107.html","posts/db3ef1dd.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };