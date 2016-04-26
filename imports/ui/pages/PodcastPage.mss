@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

$sidebar-width: 30%;
$image-offset: 100px;
$title-size: 2.5rem;
$author-size: 1.5rem;
$title-height: "#{$padding-large + $padding-huge} + #{$title-size + $author-size}";

.header {
  position: relative;
  padding: $padding-huge 0;
  line-height: 1;

  @include below($s-max) {
    padding: $padding-large 0;
  }
}

.title {
  width: (100% - $sidebar-width);
  padding-left: $padding-huge;
  position: relative;
  left: $sidebar-width;
  text-wrap: none;
  text-overflow: ellipsis;

  h1 {
    font-size: $title-size;
    margin-top: 0;
    margin-bottom: $padding-large;
  }
  h2 {
    font-size: $author-size;
    margin: 0;
    font-weight: normal;
  }
  .artistName {
    font-weight: bold;
  }

  @include below($s-max) {
    padding-left: $padding-large;
  }
}

.content {
  display: flex;
}

.sidebar {
  z-index: 20;
  margin-top: unquote("calc(-1 * (#{$title-height}))");
  width: $sidebar-width;
  height: 0%;
  background: darken($gray, 10%);

  img {
    width: 100%;
  }

  p {
    line-height: 1.4;
    color: #fff;
  }
}

.sidebarContent {
  padding: $padding;
}

.episodeList {
  width: (100% - $sidebar-width);
  background: #fff;
}

.episodesTitle {
  @extend .block-text;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 300;
}
