@import 'client/stylesheets/includes/_variables.scss';

$player-padding: $padding-small;
$image-size: ($player-height - 2 * $player-padding);
$font-size: 0.9rem;
$bar-width: 2px;
$progress-color: $maroon;
$control-width: 3 * $image-size;

.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: $player-height;
  background: $light-gray;
  border-top: 1px solid darken($light-gray, 20%);
  color: $black;
  padding: $player-padding;
  display: flex;
  z-index: 30;
}

.image {
  height: 100%;
  width: $image-size;
  background-size: cover;
  background-position: center;
}

.controls {
  display: flex;
  width: $control-width;
  padding: 0 $padding-small;
  justify-content: space-around;
  align-items: center;

  :global(.fa) {
    font-size: 1.3rem;
  }

  .pause {
    font-size: 1.6rem;
  }
}

.info {
  font-size: $font-size;
  font-weight: 300;
  width: unquote("calc(100% - #{$image-size + $control-width})");
  padding: 0 $padding-small;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.nowPlaying {
  display: flex;
  justify-content: space-between;
}

.title {
  font-weight: normal;
}

.progress {
  width: 100%;
  height: ($font-size * 2 / 3);
  position: relative;

  .bar,
  .filledBar,
  .indicator {
    position: absolute;
  }

  .bar {
    width: 100%;
    border-top: $bar-width solid darken($light-gray, 20%);
  }

  .filledBar {
    border-top: $bar-width solid $progress-color;
  }

  .indicator {
    border-radius: 50%;
    width: (4 * $bar-width);
    height: (4 * $bar-width);
    transform: translateX(-50%) translateY(-50%);
    background: $progress-color;
  }

  &:hover {
    .indicator {
      width: (7 * $bar-width);
      height: (7 * $bar-width);
    }
  }
}
