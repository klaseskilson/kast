@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

$image-width: 60px;

.loadMore {
  @extend .block-text;

  line-height: $image-width;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background: $olive;
  color: $white;

  &:hover {
    background: darken($olive, 10%);
  }
}

.episode {
  padding: $padding;

  &:hover {
    background: $light-gray;

    .playback {
      opacity: 0.2;
    }

    .button {
      opacity: 0.5;
    }
  }

  &.nowPlaying {
    background: $sorbet-1;
  }

  a {
    color: lighten($black, 40%);
    text-decoration: none;

    &:hover {
      color: $black;
    }
  }
}

.titleLine {
  display: flex;
}

.image {
  display: flex;
  width: $image-width;
  height: $image-width;
  background: transparent;
  background-position: center;
  background-size: cover;
}

.button,
.playback {
  cursor: pointer;
  line-height: $image-width;
  width: $image-width;
  text-align: center;
  font-size: 1.7rem;
}

.button {
  opacity: 0;

  &:hover {
    opacity: 1.0 !important;
  }
}

.playback {
  color: $black;

  &:hover {
    text-shadow: 0 0 1em $black;
    color: #fff;
    opacity: 1 !important;
  }
}

.info {
  width: unquote("calc(100% - #{2 * $image-width})");
  align-self: center;
  padding: 0 $padding-horizontal;
}

.loggedIn .info {
  width: unquote("calc(100% - #{3 * $image-width})");
}

.moreInfo {
  padding-top: $padding-small;
  font-size: 0.9em;

  h3 {
    font-size: 1em;
    margin: 0;
  }
}

.title {
  font-size: 1.2rem;
}

.date {
  display: block;
  color: $gray;
}

.played .title {
  color: lighten($black, 40%);
}
