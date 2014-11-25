import ui.TextView as TextView;
import accelerometer.util.shakedetect as shakedetect;


SHAKE_COOLDOWN = 2000;

exports = Class(GC.Application, function () {

  this.initUI = function () {

    // create a text view with default text '...'
    this.shakeText = new TextView({
      superview: this.view,
      text: "...",
      color: "white",
      x: 0,
      y: 150,
      width: this.view.style.width,
      height: 100
    });

    // turn off shakedetect on hide, on on show
    GC.on('hide', function () { shakedetect.stop(); });
    GC.on('show', bind(this, function () { this.startshakedetect(); }));

    // start listening for shakes
    this.shakeCooldown = 0;
    this.startshakedetect();
  };

  // when shaking is detected, change text and set cooldown
  this.startshakedetect = function () {
    shakedetect.start(bind(this, function() {
      logger.log("User shook the phone!");
      this.shakeText.setText("Don't shake me bro!");
      this.shakeCooldown = SHAKE_COOLDOWN;
    }));
  };

  // every tick, decrement the cooldown and set the text
  // back to '...' after enough time has passed
  this.tick = function (dt) {
    if (this.shakeCooldown > 0) {
      this.shakeCooldown -= dt;

      if (this.shakeCooldown <= 0) {
        this.shakeText.setText('...');
      }
    }
  };
});
