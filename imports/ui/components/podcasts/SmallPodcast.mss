@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

$img-width: 40px;

.podcast {
  display: flex;
  color: $gray;
  padding: ($padding-small / 2) 0;

  & + & {
    border-top: 1px solid $silver;
  }

  &:hover {
    background: $light-gray;

    .trash {
      opacity: 0.5;
    }
  }
}

.podcast a {
  width: unquote("calc(100% - #{$img-width})");
  display: flex;
  color: $gray;
  text-decoration: none;

  &:hover .title {
    color: lighten($black, 30%);
  }
}

.title {
  color: $black;
}

.artist {
  text-transform: uppercase;
  font-size: 0.8em;
}

.image {
  width: $img-width;
  height: $img-width;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.info {
  width: unquote("calc(100% - #{$img-width})");
  padding: 0 $padding-small;
  align-self: center;
}

.trash {
  width: $img-width;
  line-height: $img-width;
  text-align: center;
  opacity: 0;
  cursor: pointer;
  color: $black;
  font-size: 1.1em;

  &:hover {
    opacity: 1.0 !important;
  }
}
