
var hBSlider = {

  data: {
    config: {
      autoPlay: true,
      delay: 3
    },
    items: [],
    autoPlayFlag: null,
    current: 0
  },
  setConfig: function (config) {
    Object.assign(this.data.config, config)
  },
  setItems: function (items) {
    this.data.items = items;
  },
  init: function () {
    var sliderList = $(".slider-item-list");
    var sliderDots = $(".slider-dots-wrap");
    var count = this.data.items.length;
    var itemWidth = 100 / count + '%';
    sliderList.css('width', count * 100 + '%');
    for (var i = 0; i < count; i++) {
      var item = this.data.items[i];
      sliderList.append("<div class=\"slider-item\" style=\"width: " + itemWidth + "\"><a href=\"" + item.typeId + "\" class=\"img\" style=\"background-image: url(" + item.picUrl + ")\"><\/a><\/div>");
      sliderDots.append("<span class=\"slider-dot\" id=\"slider-dot-" + (i + 1) + "\" onclick=\"hBSlider.go(" + (i + 1) + ")\"></span>");
    }
    $("#slider-dot-1").addClass('slider-dot-selected');
  },
  turn: function (i) {
    var count = this.data.items.length;
    var _i = this.data.current + i;
    if (_i < 0) {
      _i = _i + count;
    }
    if (_i >= count) {
      _i = _i - count;
    }
    this.data.current = _i;
    $(".slider-item-list").css('left', -100 * this.data.current + '%');
    $("span[id^=slider-dot-]").removeClass('slider-dot-selected');
    $("#slider-dot-" + (_i + 1)).addClass('slider-dot-selected');
    this.pause();
    this.play();
  },
  play: function () {
    var self = this;
    if (this.data.config.autoPlay) {
      this.data.autoPlayFlag = setInterval(function () {
        self.turn(1);
      }, this.data.config.delay * 1000);
    }
  },
  pause: function () {
    clearInterval(this.data.autoPlayFlag);
  },
  go: function (i) {
    var option = i - 1 - this.data.current;
    this.turn(option);
  }
};
