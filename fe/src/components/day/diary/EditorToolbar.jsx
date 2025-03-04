import PropTypes from "prop-types";

import { editorStyles } from "./styles/editorStyles";

function EditorToolbar({ editor, onButtonClick }) {

  return (
    <div className={editorStyles.editorMenu}>
      <div className={editorStyles.menuGroup}>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            )
          }
          className={`${editorStyles.menuButton} ${editor.isActive("heading", { level: 1 }) ? editorStyles.activeButton : ""}`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            )
          }
          className={`${editorStyles.menuButton} ${editor.isActive("heading", { level: 2 }) ? editorStyles.activeButton : ""}`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            )
          }
          className={`${editorStyles.menuButton} ${editor.isActive("heading", { level: 3 }) ? editorStyles.activeButton : ""}`}
          type="button"
        >
          H3
        </button>
      </div>

      <div className={editorStyles.menuGroup}>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleBold().run())
          }
          className={`${editorStyles.menuButton} ${editor.isActive("bold") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          굵게
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleUnderline().run())
          }
          className={`${editorStyles.menuButton} ${editor.isActive("underline") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          밑줄
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleStrike().run())
          }
          className={`${editorStyles.menuButton} ${editor.isActive("strike") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          취소선
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleHighlight().run())
          }
          className={`${editorStyles.menuButton} ${editor.isActive("highlight") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          형광펜
        </button>
      </div>

      <div className={editorStyles.menuGroup}>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleBulletList().run())
          }
          className={`${editorStyles.menuButton} ${editor.isActive("bulletList") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          목록
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleOrderedList().run()
            )
          }
          className={`${editorStyles.menuButton} ${editor.isActive("orderedList") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          번호
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleBlockquote().run()
            )
          }
          className={`${editorStyles.menuButton} ${editor.isActive("blockquote") ? editorStyles.activeButton : ""}`}
          type="button"
        >
          인용
        </button>
      </div>
    </div>
  );
};

EditorToolbar.propTypes = {
  editor: PropTypes.object.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default EditorToolbar;