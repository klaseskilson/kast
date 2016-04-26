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
  display: flex;
  padding: $padding;

  &:hover {
    background: $silver;

    .playback {
      opacity: 0.2;
    }
  }
}

.image {
  display: flex;
  width: $image-width;
  height: $image-width;
  background: transparent;
  background-position: center;
  background-size: cover;
}

.playback {
  width: $image-width;
  text-align: center;
  line-height: $image-width;
  color: $black;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    //background: rgba($black, 0.8);
    text-shadow: 0 0 1em $black;
    color: #fff;
    opacity: 1 !important;
  }
}

.info {
  width: unquote("calc(100% - #{$image-width})");
  align-self: center;
  padding: 0 $padding-horizontal;
}

.title {
  font-size: 1.2rem;
}

.date {
  display: block;
  color: $gray;
}
