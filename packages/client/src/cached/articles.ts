// This file is generated by scripts/cache-docs.ts, do not edit it manually
import type { Article } from "../schema.js";

export const articles: Article[] = [
  {
    _createdAt: "2023-10-25T14:28:07Z",
    _id: "b7915288-c1a2-402b-8182-0cb6e94e1487",
    _rev: "g4WGtXEJHMGyIQGoBvGIZl",
    _type: "article",
    _updatedAt: "2023-11-14T03:06:02Z",
    contents:
      "Embed this widget on your site, so users will get notified of updates.\n\nThe notification users with an updatable browser will see:\n\n<WidgetDemoButton>Show widget</WidgetDemoButton>\n\nInsert the following code before the closing &lt;/body&gt; tag in your page:\n\n```\n<script>\n(function(u) {\n    var s = document.createElement('script'); s.async = true; s.src = u;\n    var b = document.getElementsByTagName('script')[0]; b.parentNode.insertBefore(s, b);\n})('//updatemybrowser.org/umb.js');\n</script>\n```\n\n<Callout>\nWe're working on a new version of the widget. Please check back soon for an improved version of this widget.\n</Callout>",
    hidden: true,
    language: "en",
    slug: {
      _type: "slug",
      current: "widget",
    },
    title: "Widget",
    translationOf: null,
  },
];
