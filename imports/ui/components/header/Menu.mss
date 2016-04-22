@import 'client/stylesheets/includes/_variables.scss';

/**
 * used by all menus in header
 */

$border-width: $header-border-width;

.container {
  display: flex;
  justify-content: space-between;
}

.nav-item-sizes {
  padding-left: $padding-large;
  padding-right: $padding-large;
  padding-top: ($padding-large + $border-width);
  padding-bottom: ($padding-large - 2 * $border-width);
  border-bottom: $border-width solid transparent;
  font-size: .9rem;
}

.nav-item {
  @extend .nav-item-sizes;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.nav-item.nav-item--active {
  border-color: $olive;
}

.common {
  display: flex;
}

.common > a {
  @extend .nav-item;
  text-decoration: none;
  color: $olive;

  &:hover {
    border-color: $green;
    color: darken($olive, 10%);
  }
}

