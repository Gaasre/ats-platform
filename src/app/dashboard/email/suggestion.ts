import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import MentionList from "./MentionList.tsx";

const Suggestion = {
  items: ({ query }: { query: any }) => {
    return ["Candidate.Firstname", "Candidate.Lastname"]
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy(props.editor.options.element, {
          getReferenceClientRect: props.clientRect,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup.setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup.hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup.destroy();
        component.destroy();
      },
    };
  },
};

export default Suggestion;
