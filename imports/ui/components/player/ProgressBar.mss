@import "./_variables.mss";

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
