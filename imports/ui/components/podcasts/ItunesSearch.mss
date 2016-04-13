@import 'client/stylesheets/includes/_mixins',
        'client/stylesheets/includes/_variables';

.searchResults {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.searchResults article {
  flex-grow: 1;
  max-width: unquote("calc(25% - #{$padding-large})");

  @include tablet() {
    max-width: unquote("calc(#{100% / 3} - #{$padding-large})");
  }

  @include phone() {
    max-width: unquote("calc(50% - #{$padding-large})");
  }
}

//.searchResults > article ~ article {
//  margin-left: $padding-large;
//}
