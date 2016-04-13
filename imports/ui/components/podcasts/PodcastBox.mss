@import 'client/stylesheets/includes/_variables',
        'client/stylesheets/includes/_mixins';

$image-size: 100px;
$image-offset: ($image-size / 2);
$more-link-height: unquote("calc(#{2 * $padding-small} + 1rem)");

// size-independent styling of the podcastBox
.podcastBox {
  @extend .hover-box;
  margin: $image-offset 0 $image-offset;
  padding: $image-offset $padding-horizontal $more-link-height;
  position: relative;
}

.podcastBox img {
  @extend .center-absolute;
  max-width: 100%;
  display: block;
  top: -$image-offset;
}

.podcastBox h3,
.podcastBox h4 {
  text-align: center;
  margin: $padding-vertical auto 0;
}

.podcastBox h3 {
  font-size: 1.1rem;
}

.podcastBox h3 span {
  display: inline-block;
  text-align: left;
}

.podcastBox h4 {
  font-size: 1.0rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $gray;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.podcastBox a {
  @extend .block-text, .left-bottom;

  color: $blue;
  border-bottom: 3px solid $blue;
  padding-bottom: ($padding-small - 3px);
  transition: all 0.1s ease;
  box-sizing: border-box;

  &:hover {
    background: $blue;
    color: #fff;
  }
}
