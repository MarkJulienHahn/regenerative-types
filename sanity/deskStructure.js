import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.divider(),

      orderableDocumentListDeskItem({
        type: "projects",
        title: "Projects",
        S,
        context,
      }),

      // orderableDocumentListDeskItem({
      //   type: "assemblages",
      //   title: "Assemblages",
      //   S,
      //   context,
      // }),

      // orderableDocumentListDeskItem({
      //   type: "types",
      //   title: "Types",
      //   S,
      //   context,
      // }),

      orderableDocumentListDeskItem({
        type: "references",
        title: "References",
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: "phenomena",
        title: "Phenomena",
        S,
        context,
      }),

      S.divider(),
    ]);
