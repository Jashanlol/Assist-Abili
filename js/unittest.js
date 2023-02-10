files: [
    // ...
    { pattern: 'css/popup.css', included: false }
    // The 'included' parameter prevents Karma from automatically loading your CSS. 
  ]

  var quixote = require("quixote");

  var frame;
  
  beforeEach(function(done) {
    frame = quixote.createFrame({ stylesheet: "css/popup.css" }, done);
  });
  
  afterEach(function() {
    frame.remove();
  });

