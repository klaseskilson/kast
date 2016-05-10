@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

.container {
  margin: 0 auto;
  width: 100%;
  max-width: $s-max;

  &:global(.narrow) {
    max-width: 400px;
  }

  @include phone() {
    padding: 0 $padding-large;
  }
}

.nothingFound {
}

.fadeInLoader {
  opacity: 1;
  transition: opacity 1s ease;

  &.loading {
    opacity: 0;
  }
}

.fancyHeader {
  margin-top: unquote("calc(-1 * (#{$header-height-unquote}))");
  padding-top: $header-height;
  background: #8fa1b3;
  position: relative;
  color: #fff;

  & > * {
    z-index: 10;
    position: relative;
  }
}

.bigHeader {
  @extend .fancyHeader;
  background: #444444;
  background: linear-gradient(135deg, $sorbet-2, $sorbet-3);
  text-align: center;

  h1 {
    font-weight: 300;
    font-size: 3em;
  }
  h2 {
    font-weight: 300;
  }
  .container {
    padding: $padding-huge 0;
  }
}

.blurredBackground {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  display: none;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-filter: blur(100px) brightness(0.5);
}
