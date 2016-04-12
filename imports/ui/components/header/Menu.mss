@import 'client/stylesheets/includes/_variables';

$border-width: $header-border-width;

.container {
  display: flex;
  justify-content: space-between;
}

.nav-item-sizes {
  padding: $padding-large;
  padding-bottom: ($padding-large - $border-width);
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

