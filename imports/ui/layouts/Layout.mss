@import 'client/stylesheets/includes/_variables.scss';

$header-height: unquote("calc(#{2 * $padding-large + $header-border-width} + .9rem)");

.wrapper {
  width: 100%;
}

.mainLayout {
  font-size: 1em;
}

.mainLayout > :first-child {
  padding-top: $header-height;
}
