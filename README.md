[![Apache License](https://img.shields.io/badge/license-Apache%202.0-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Support](https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg)](https://docs.mendix.com/developerportal/app-store/app-store-content-support)
[![Studio](https://img.shields.io/badge/Studio%20version-9.0%2B-blue.svg)](https://appstore.home.mendix.com/link/modeler/)

# Segmented Progress Bar widget

Show a segmented progressbar in your Mendix Native Mobile app

## Features

TBD

## Usage

TBD

## Styling

Styling is done in normal [Mendix Native Styling](https://docs.mendix.com/refguide/native-styling-refguide) procedures.

Class: `com_mendixlabs_widget_native_segmentedprogressbar_SegmentedProgressBar`

Default styling:

```js
export const com_mendixlabs_widget_native_segmentedprogressbar_SegmentedProgressBar = {
    container: {
        flexDirection: "row",   // We need this to render the bars horizontally
        width: "100%"           // We set the width to the maximum of the container
    },
    item: {
        height: 20,             // Height of the progressbar
        borderRadius: 20        // Borderradius of left- and right-most item
    }
};
```

## Issues, suggestions and feature requests

TBD

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

## License

Apache 2
