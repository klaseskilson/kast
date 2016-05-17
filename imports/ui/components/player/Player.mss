@import 'client/stylesheets/includes/_variables.scss',
        './_variables.mss';

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
    cursor: pointer;
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
