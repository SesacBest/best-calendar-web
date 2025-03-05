import PropTypes from "prop-types";

import DiaryEditor from "./DiaryEditor";
import { editorStyles } from "./styles/editorStyles";

function DiaryForm ({ content, onContentChange, onSubmit }) {
  return (
    <div className={editorStyles.DiaryForm}>
      <form onSubmit={onSubmit}>
        <div className={editorStyles.FormDiv}>
          <DiaryEditor content={content} onUpdate={onContentChange} />
        </div>
        <div className={editorStyles.ButtonDiv}>
          <button type="submit" className={`${editorStyles.ButtonStyle} border-black text-primary`}>
            저장
          </button>
        </div>
      </form>
    </div>
  )
};

DiaryForm.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DiaryForm;