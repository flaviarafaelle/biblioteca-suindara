export default {
  type: "object",
  properties: {
    kind: { type: "string" },
    totalItems: { type: "integer", format: "int32" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          kind: { type: "string" },
          id: { type: "string" },
          etag: { type: "string" },
          selfLink: { type: "string" },
          volumeInfo: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              authors: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              publishedDate: { type: "string" },
              industryIdentifiers: {
                type: "string",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    identifier: {
                      type: "string",
                    },
                  },
                },
              },
              readingModes: {
                type: "object",
                properties: {
                  text: {
                    type: "boolean",
                  },
                  image: {
                    type: "boolean",
                  },
                },
              },
              pageCount: {
                type: "integer",
                format: "int32",
              },
              printType: {
                type: "string",
              },
              categories: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              maturityRating: {
                type: "string",
              },
              allowAnonLogging: {
                type: "boolean",
              },
              contentVersion: {
                type: "string",
              },
              panelizationSummary: {
                type: "object",
                properties: {
                  containsEpubBubbles: {
                    type: "boolean",
                  },
                  containsImageBubbles: {
                    type: "boolean",
                  },
                },
              },
              language: {
                type: "string",
              },
              previewLink: {
                type: "string",
              },
              infoLink: {
                type: "string",
              },
              canonicalVolumeLink: {
                type: "string",
              },
            },
          },
          saleInfo: {
            type: "object",
            properties: {
              country: {
                type: "string",
              },
              saleability: {
                type: "string",
              },
              isEbook: {
                type: "boolean",
              },
            },
          },
          accessInfo: {
            type: "object",
            properties: {
              country: {
                type: "string",
              },
              viewability: {
                type: "string",
              },
              embeddable: {
                type: "boolean",
              },
              publicDomain: {
                type: "boolean",
              },
              textToSpeechPermission: {
                type: "string",
              },
              epub: {
                type: "object",
                properties: {
                  isAvailable: {
                    type: "boolean",
                  },
                },
              },
              pdf: {
                type: "object",
                properties: {
                  isAvailable: {
                    type: "boolean",
                  },
                },
              },
              webReaderLink: {
                type: "string",
              },
              accessViewStatus: {
                type: "string",
              },
              quoteSharingAllowed: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
  required: [],
  additionalProperties: false,
};
