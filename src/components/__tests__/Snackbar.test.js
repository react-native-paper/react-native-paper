// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders not visible snackbar with content wrapper but no actual content 1`] = `null`;

exports[`renders snackbar with Text as a child 1`] = `
<RCTSafeAreaView
  pointerEvents="box-none"
  style={
    Object {
      "bottom": 0,
      "position": "absolute",
      "width": "100%",
    }
  }
>
  <View
    accessibilityLiveRegion="polite"
    pointerEvents="box-none"
    style={
      Object {
        "alignItems": "center",
        "backgroundColor": "#323232",
        "borderRadius": 4,
        "elevation": 6,
        "flexDirection": "row",
        "justifyContent": "space-between",
        "margin": 8,
        "opacity": 1,
        "shadowColor": "#000000",
        "shadowOffset": Object {
          "height": 5,
          "width": 0,
        },
        "shadowOpacity": 0.24,
        "shadowRadius": 6,
        "transform": Array [
          Object {
            "scale": 1,
          },
        ],
      }
    }
  >
    <Text
      style={
        Array [
          Object {
            "color": "#000000",
            "fontFamily": "Helvetica Neue",
            "textAlign": "left",
            "writingDirection": "ltr",
          },
          Array [
            Object {
              "color": "#ffffff",
              "flex": 1,
              "flexWrap": "wrap",
              "marginLeft": 16,
              "marginVertical": 14,
            },
            Object {
              "marginRight": 16,
            },
          ],
        ]
      }
    >
      <Text>
        Snackbar content
      </Text>
    </Text>
  </View>
</RCTSafeAreaView>
`;

exports[`renders snackbar with action button 1`] = `
<RCTSafeAreaView
  pointerEvents="box-none"
  style={
    Object {
      "bottom": 0,
      "position": "absolute",
      "width": "100%",
    }
  }
>
  <View
    accessibilityLiveRegion="polite"
    pointerEvents="box-none"
    style={
      Object {
        "alignItems": "center",
        "backgroundColor": "#323232",
        "borderRadius": 4,
        "elevation": 6,
        "flexDirection": "row",
        "justifyContent": "space-between",
        "margin": 8,
        "opacity": 1,
        "shadowColor": "#000000",
        "shadowOffset": Object {
          "height": 5,
          "width": 0,
        },
        "shadowOpacity": 0.24,
        "shadowRadius": 6,
        "transform": Array [
          Object {
            "scale": 1,
          },
        ],
      }
    }
  >
    <Text
      style={
        Array [
          Object {
            "color": "#000000",
            "fontFamily": "Helvetica Neue",
            "textAlign": "left",
            "writingDirection": "ltr",
          },
          Array [
            Object {
              "color": "#ffffff",
              "flex": 1,
              "flexWrap": "wrap",
              "marginLeft": 16,
              "marginVertical": 14,
            },
            Object {
              "marginRight": 0,
            },
          ],
        ]
      }
    >
      Snackbar content
    </Text>
    <View
      style={
        Object {
          "backgroundColor": "transparent",
          "borderColor": "transparent",
          "borderRadius": 4,
          "borderStyle": "solid",
          "borderWidth": 0,
          "elevation": 0,
          "marginHorizontal": 8,
          "marginVertical": 6,
          "minWidth": "auto",
          "shadowColor": "#000000",
          "shadowOffset": Object {
            "height": 0,
            "width": 0,
          },
          "shadowOpacity": 0.24,
          "shadowRadius": 0,
        }
      }
    >
      <View
        accessibilityRole="button"
        accessible={true}
        isTVSelectable={true}
        onResponderGrant={[Function]}
        onResponderMove={[Function]}
        onResponderRelease={[Function]}
        onResponderTerminate={[Function]}
        onResponderTerminationRequest={[Function]}
        onStartShouldSetResponder={[Function]}
        style={
          Array [
            Object {
              "overflow": "hidden",
            },
            Array [
              Object {
                "flex": 1,
                "width": "100%",
              },
              Object {
                "borderRadius": 4,
              },
            ],
          ]
        }
      >
        <View
          style={
            Array [
              Object {
                "alignItems": "center",
                "flexDirection": "row",
                "justifyContent": "center",
              },
              undefined,
            ]
          }
        >
          <Text
            numberOfLines={1}
            style={
              Array [
                Object {
                  "color": "#000000",
                  "fontFamily": "Helvetica Neue",
                  "textAlign": "left",
                  "writingDirection": "ltr",
                },
                Array [
                  Object {
                    "letterSpacing": 1,
                    "marginHorizontal": 16,
                    "marginVertical": 9,
                    "textAlign": "center",
                  },
                  Object {
                    "marginHorizontal": 8,
                  },
                  Object {
                    "color": "#03dac4",
                    "fontFamily": "HelveticaNeue-Medium",
                  },
                  Object {
                    "fontFamily": "HelveticaNeue-Medium",
                  },
                ],
              ]
            }
          >
            UNDO
          </Text>
        </View>
      </View>
    </View>
  </View>
</RCTSafeAreaView>
`;

exports[`renders snackbar with content 1`] = `
<RCTSafeAreaView
  pointerEvents="box-none"
  style={
    Object {
      "bottom": 0,
      "position": "absolute",
      "width": "100%",
    }
  }
>
  <View
    accessibilityLiveRegion="polite"
    pointerEvents="box-none"
    style={
      Object {
        "alignItems": "center",
        "backgroundColor": "#323232",
        "borderRadius": 4,
        "elevation": 6,
        "flexDirection": "row",
        "justifyContent": "space-between",
        "margin": 8,
        "opacity": 1,
        "shadowColor": "#000000",
        "shadowOffset": Object {
          "height": 5,
          "width": 0,
        },
        "shadowOpacity": 0.24,
        "shadowRadius": 6,
        "transform": Array [
          Object {
            "scale": 1,
          },
        ],
      }
    }
  >
    <Text
      style={
        Array [
          Object {
            "color": "#000000",
            "fontFamily": "Helvetica Neue",
            "textAlign": "left",
            "writingDirection": "ltr",
          },
          Array [
            Object {
              "color": "#ffffff",
              "flex": 1,
              "flexWrap": "wrap",
              "marginLeft": 16,
              "marginVertical": 14,
            },
            Object {
              "marginRight": 16,
            },
          ],
        ]
      }
    >
      Snackbar content
    </Text>
  </View>
</RCTSafeAreaView>
`;
